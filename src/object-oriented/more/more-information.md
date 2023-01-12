[👈 이전으로](../README.md)

### 추가로 객체지향에서 알아야 할 내용

#### DI (Dependency Injection)의존성 주입

- 어떠한 경우에도 다운캐스팅 금지
- 폴리모피즘(추상 인터페이스) 사용
  -> 어떤 객체를 직접인식하지 말고 추상인터페이스를 인식하도록 하고 다운 캐스팅 금지
- DI는 IoC (Inversion of Control) 제어역전의 일부임

```js
class Worker {
  run() {
    console.log('working');
  }
  print() {
    this.run();
  }
}
class HardWorker extends Worker {
  run() {
    console.log('hardWorking');
  }
}
```

```js
class Manager {
  #workers;
  constructor(...workers) {
    if (workers.every((w) => w instanceof Worker)) this.#workers = workers;
    else throw 'invalid workers';
  }
  doWork() {
    this.#workers.forEach((w) => w.run());
  }
}
const manager = new Manager(new Worker(), new HardWorker());
manager.doWork();
// 의존성을 구상클래스 HardWorker가 아닌 추상클래스 Worker에 두고 있으므로
// run()을 수정하고 싶은 새 구상클래스를 만들 수 있다 -> 확장에 열려있다.(Open)
// 확장할 때마다 Manager 클래스는 수정하지 않아도 된다 (Close)
// -> OCP를 달성하면 자연스럽게 의존성 역전이 달성된다.
```

#### Dry (Don't Repeat Yourself) 중복방지

- 두번 나오지 않게 반복 부분을 제거해라

#### Hollywood Principle 의존성 부패방지

> “Don’t call us, we’ll call you” 우리한테 연락하지 마세요. 우리가 연락할께요

- 질의를 하지말고 요청을 해라
  - 질의를 하여 값을 받아 올 경우 격리를 깨먹게 된다 (정보의 은닉 위반)
  - ex) 해당 객체에 값을 받아 로직을 처리하려 했지만 그사이 객체의 해당 값이 변경되어 처리 실패
    ( 연료봉.온도 받기() -> 온도에 따른 로직 처리 ) X
    ( 연로봉.온도내리기() ) O 상태를 연료봉 객체내에서 관리한다
- 헐리우드 원칙을 지키지 않으면 정보의 은닉이나 캡슐화를 지키지 않고있을 확률이 높다

#### Law of Demeter 최소 지식

- 어떤 객체에 대한 지식을 알때 최소한을 알아야 함

최소 지식이란

- 인자로 넘어온 객체의 타입
  - 인자로 넘어온 객체에서 ...으로 내장 타입까지 사용하면
    연계의 의존성이 계속 생겨서 의존성이 복잡해진다.
- 내부에 생성한 객체의 타입
- 원래 객체가 가진 필드의 타입

. . . 을 통해서 대상보다 더많은 객체를 알게되면
train wreck 열차 전복이 일어남
