type BaseObj = { [key: string]: string };
type CustomObj = { [type: string]: string | ViewModel };
type EventObj = { [type: string]: (e: Event, vm: ViewModel) => any };

type BaseProperty =
  | 'styles'
  | 'attributes'
  | 'properties'
  | 'events'
  | 'custom';

type DomObject = {
  styles: BaseObj;
  attributes: BaseObj;
  properties: BaseObj;
  events: EventObj;
  custom: CustomObj;
};

/*
    HTML 에서 Scanner가 viewmodel 속성을 가진 요소를 스캔하여 BinderItem 생성
    BinderItem - 해당 엘리먼트와 매칭해야 할 viewmodel 키값을 가지고 있음(lazy 바인딩을 위해 키값으로 가짐)
*/

class ViewModel {
  // private 필드의 Symbol을 통해 외부에서의 생성을 막을 수 있다. (Private Constructor)
  static #private = Symbol();
  static get(data: DomObject) {
    return new ViewModel(this.#private, data);
  }

  styles: BaseObj = {};
  attributes: BaseObj = {};
  properties: BaseObj = {};
  events: EventObj = {};

  custom: CustomObj = {};

  constructor(checker: Symbol, data: DomObject) {
    if (checker != ViewModel.#private)
      throw 'ViewModel.get() 메소드를 사용하지 않았습니다.';

    Object.keys(data).forEach((k) => {
      const key = k as BaseProperty;
      if (key === 'custom') {
        this[key] = data[key] as CustomObj;
      } else if (key === 'events') {
        this[key] = data[key] as EventObj;
      } else {
        this[key] = data[key];
      }
    });
    // 한번 객체가 생성되면 더이상 커스텀 키를 추가할 수 없도록 밀봉(값 변경만 가능)
    Object.seal(this.custom);
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

class Binder {
  #items = new Set<BinderItem>();

  // Scanner가 Binder에 주입해야 하기 때문에 add 메소드 생성
  add(item: BinderItem) {
    this.#items.add(item);
  }
  render(viewmodel: ViewModel) {
    this.#items.forEach((item) => {
      if (!(viewmodel.custom[item.viewmodel] instanceof ViewModel)) {
        throw '잘못된 viewmodel key 입니다.';
      }
      const vm = viewmodel.custom[item.viewmodel] as ViewModel;
      const el = item.el;

      Object.keys(vm.styles).forEach((key) => {
        el.style.setProperty(key, vm.styles[key]);
      });
      Object.keys(vm.attributes).forEach((key) => {
        el.setAttribute(key, vm.attributes[key]);
      });
      Object.keys(vm.properties).forEach((key) => {
        el.setAttribute(`data-${key}`, vm.properties[key]);
      });
      Object.keys(vm.events).forEach((key) => {
        if (!key.startsWith('on')) throw '이벤트 핸들러가 아닙니다.';
        //(e: Event) => vm.events[key].call(el, e, vm)
      });
    });
  }
}

const dom = document.createElement('div').style;
