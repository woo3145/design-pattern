// View가 어떻게 보일지 알려주는 역할
// 제어부분을 빼고 제어를 하기위한 부품만 구현됨
interface View {
  getElement(data: any): HTMLElement;
  initAni(): void;
  startAni(): void;
}

// 화면에 View를 실제로 보여주는 역할
// view를 가지고 렌더링을 하기위한 제어의 역할을 수행함
// ex) 렌더링 할 엘리먼트 가져옴 -> 애니메이션 초기화 -> 애니매이션 실행
class Renderer<T> {
  #base: T;
  #view: View | null = null;
  constructor(baseElement: T) {
    this.#base = baseElement;
  }
  set view(v: View) {
    this.#view = v;
  }
  render(data: any) {
    const base = this.#base;
    const view = this.#view;
    if (!view) throw 'no view';
    if (base instanceof HTMLElement) {
      let target = base.firstElementChild;
      while (target) {
        base.removeChild(target);
        target = target.nextElementSibling;
      }

      base.appendChild(view.getElement(data));
      view.initAni();
      view.startAni();
    }
  }
}

class TitleView implements View {
  #el: HTMLDivElement = document.createElement('div');

  getElement(data: any) {
    this.#el = document.createElement('div');
    this.#el.innerHTML = `<h2>${data.title}<h2><p>${data.description}</p>`;
    this.#el.style.cssText = `width:100%;background:${data.background}`;
    return this.#el;
  }
  initAni() {
    const style = this.#el.style;
    style.marginLeft = '100%';
    style.transition = 'all 0.3s';
  }
  startAni() {
    requestAnimationFrame((_) => (this.#el.style.marginLeft = '0'));
  }
}

const renderer = new Renderer<HTMLElement>(document.body);

renderer.view = new TitleView();

renderer.render({
  title: '제목',
  description: '설명',
  background: 'blue',
});
