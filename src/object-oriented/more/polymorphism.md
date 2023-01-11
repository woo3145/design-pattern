[👈 이전으로](../../README.md)

#### Polymorphism (다형성)

- 다형성 속성

  - substitution 대체 가능성
    자식이 부모를 대체가능
  - internal identity 내적 일관성
    생성 시점의 타입이 내부에 일관성 있게 참조

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
    console.log('hard working');
  }
}
const worker = new HardWorker();

// substitution
console.log(worker instanceof Worker); // true

// internal identity
worker.print(); // hard working
```

#### Polymorphism of Prototype

자바스크립트는 프로토타입 체인으로 다형성을 구현함

[자바스크립에서 프로토타입 동작방식](./prototype.md)

```js

// 내적일관성 달성 - 프로토타입 체이닝으로 가장가까운 것부터 탐색
객체에서 속성을 탐색 : 자기자신 -> __proto__ -> __proto__.__proto__ -> ... 방식으로 탐색함

++ instanceof 동작방식
worker instanceof HardWorker;

__proto__이 null일때까지 체이닝을 타고가며 __proto__(부모 프로토타입 객체)의 constructor가
찾는값과 일치하는지 확인한다.

// 대체 가능성 달성
worker.__proto__.constructor === Worker; // false
worker.__proto__.__proto__.constructor === Worker; // true

```

- 언어차원에서 다형성이 지원되면 객체지향 언어임
