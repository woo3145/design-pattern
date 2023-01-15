type BaseObj = { [key: string]: string };
type ViewModelObj = { [type: string]: string | ViewModel };
type EventObj = { [type: string]: (e: Event, vm: ViewModel) => any };

type BaseProperty = 'styles' | 'attributes' | 'properties' | 'events' | 'views';

type DomObject = {
  styles?: BaseObj;
  attributes?: BaseObj;
  properties?: BaseObj;
  events?: EventObj;
  views?: ViewModelObj;
};

/*
    HTML 에서 Scanner가 viewmodel 속성을 가진 요소를 스캔하여 BinderItem들을 생성하여 Binder를 만듬
    -> Binder에 viewmodel키와 맞는 ViewModel 객체를 매칭
    BinderItem - 해당 엘리먼트와 매칭해야 할 viewmodel 키값을 가지고 있음(lazy 바인딩을 위해 키값으로 가짐)
*/

class ViewModel {
  // 아래와 같이 private 필드의 Symbol을 통해 외부에서의 생성을 막을 수 있다. (Private Constructor)
  static #private = Symbol(); // static필드를 private으로 만들면 내부의 static함수 내에서만 접근가능
  static get(data: DomObject) {
    return new ViewModel(this.#private, data);
  }

  styles: BaseObj = {};
  attributes: BaseObj = {};
  properties: BaseObj = {};
  events: EventObj = {};

  views: ViewModelObj = {};

  constructor(checker: Symbol, data: DomObject) {
    // 외부에서 ViewModel.#private 는 static get함수를 통해서만 받을 수 있다.
    if (checker != ViewModel.#private)
      throw 'ViewModel.get() 메소드를 사용하지 않았습니다.';

    Object.keys(data).forEach((k) => {
      const key = k as BaseProperty;
      if (key === 'views') {
        this[key] = data[key] as ViewModelObj;
      } else if (key === 'events') {
        this[key] = data[key] as EventObj;
      } else {
        this[key] = data[key] as BaseObj;
      }
    });
    // 한번 객체가 생성되면 더이상 커스텀 키를 추가할 수 없도록 밀봉(값 변경만 가능)
    Object.seal(this);
  }
}

// HTML을 하나하나 Biner할 Item으로 인식
class BinderItem {
  el: HTMLElement;
  viewmodel: string; // viewmodel의 키

  constructor(el: HTMLElement, viewmodel: string) {
    this.el = el;
    this.viewmodel = viewmodel;
    // 더이상 변경x
    Object.freeze(this);
  }
}

type EventKey = keyof GlobalEventHandlers;

// 바인더의 역할
// 스캐너가 #items에 넣어준 viewmodel key들을 돌면서 render에 들어온 뷰모델을 매핑시켜준다.
class Binder {
  #items = new Set<BinderItem>();

  // Scanner가 Binder에 주입해야 하기 때문에 add 메소드 생성
  add(item: BinderItem) {
    this.#items.add(item);
  }
  render(viewmodel: ViewModel) {
    this.#items.forEach((item, idx) => {
      // 입력받은 뷰모델에 스캔한 뷰모델 키가 없으면 에러
      if (!(viewmodel.views[item.viewmodel] instanceof ViewModel)) {
        throw `Error : 입력받은 ViewModel에 ${item.viewmodel} 가 존재하지 않음`;
      }
      const vm = viewmodel.views[item.viewmodel] as ViewModel;
      const el = item.el;

      Object.keys(vm.styles).forEach((key) => {
        el.style.setProperty(key, vm.styles[key]);
      });
      Object.keys(vm.attributes).forEach((key) => {
        el.setAttribute(key, vm.attributes[key]);
      });
      Object.keys(vm.properties).forEach((key) => {
        if (key === 'innerHTML') {
          el.innerHTML = vm.properties[key];
        } else {
          el.setAttribute(`data-${key}`, vm.properties[key]);
        }
      });
      Object.keys(vm.events).forEach((key) => {
        if (!key.startsWith('on')) throw '이벤트 핸들러가 아닙니다.';
        const eventType = key.slice(2).toLowerCase();
        el.addEventListener(eventType, (e: Event) =>
          vm.events[key].call(el, e, vm)
        );
      });
    });
  }
}

// 스캐너의 역할
// 입력받은 HTML엘리먼트 자신을 포함한 자식들을 순회하며 data-viewmodel 어트리뷰트를 가진 요소를 모아 바인더를 생성한다
class Scanner {
  // HTML data-viewmodel 훅이 있으면 binderItem으로 만들어서 binder에 넣어줌
  checkItem(binder: Binder, el: HTMLElement) {
    if (el.nodeName == '#text') return;
    const vm = el.getAttribute('data-viewmodel');
    if (vm) binder.add(new BinderItem(el, vm));
  }

  // HTML을 전체 순회하여 새 바인더를 만들어줌
  scan(el: HTMLElement) {
    const binder = new Binder();

    this.checkItem(binder, el);

    // 재귀함수 대신 배열을 이용한 스택오버플로 해결
    const stack = [el.firstChild];
    let target;
    while ((target = stack.pop())) {
      this.checkItem(binder, target as HTMLElement);
      if (target.firstChild) stack.push(target.firstChild);
      if (target.nextSibling) stack.push(target.nextSibling);
    }
    return binder;
  }
}

const body = document.body;
body.innerHTML = `<section id="target" data-viewmodel="wrapper">
        <h2 data-viewmodel="title"></h2>
        <section data-viewmodel="contents"></section>
    </section>`;

// 스캐너에 넣어줄 뷰모델 값
const viewmodel = ViewModel.get({
  views: {
    wrapper: ViewModel.get({
      styles: {
        width: '50%',
        background: '#ffa',
        margin: 'auto',
      },
    }),
    title: ViewModel.get({
      properties: {
        innerHTML: 'Title',
      },
      styles: {
        'font-size': '40px',
      },
    }),
    contents: ViewModel.get({
      properties: {
        innerHTML: 'Change Text',
      },
      styles: {
        background: 'blue',
        cursor: 'pointer',
        color: 'white',
        'font-size': '24px',
      },
      events: {
        onClick: (e: Event, vm: ViewModel) => {
          console.log(e, vm);
        },
      },
    }),
  },
});

const scanner = new Scanner();

// 스캐너가 html을 스캔하고 viewmodel 훅들을 건 바인더 생성
const $target = document.querySelector('#target');
if ($target) {
  const binder = scanner.scan($target as HTMLElement);

  // 바인더에 위에서 만든 뷰모델을 연결시켜줌
  binder.render(viewmodel);
}
