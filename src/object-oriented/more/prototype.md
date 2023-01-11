[👈 이전으로](../../README.md)

#### 자바스크립트 프로토타입

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

worker.__proto__ === HardWorker.prototype;

// 자바스크립트의 class는 문법적 설탕이라 사실 함수임으로 prototype 프로퍼티를 가짐
HardWorker.prototype;

function HardWorker() {}
HardWorker.prototype.__proto__ = Worker.prototype; // 자신의 부모역할을 하는 프로토타입 객체
HardWorker.prototype.constructor = HardWorker; //자신을 생성한 객체를 가리킴
HardWorker.prototype.run = function () {
  console.log('hard working');
};
```

- 함수를 포함하는 **모든 객체**는 \_\_proto\_\_ 프로퍼티를 가짐
  - \_\_proto\_\_ : 자신의 부모역할을 하는 프로토타입 객체를 가리킴
- **함수 객체만** prototype 프로퍼티를 가짐
  - prototype : 자식에게 넘기고 싶은 유전자 (메소드 변수 등)
    - default로 constructor 프로퍼티를 가짐
      - constructor : 자신을 생성한 객체를 가리킴

#### 프로토타입 체이닝

```js
worker.__proto__ === HardWorker.prototype; // true
HardWorker.prototype.__proto__ === Worker.prototype; // true
Worker.prototype.__proto__ === Object.prototype; // true
Object.prototype__proto__ === null; // true

** 위 worker객체에서 print 메서드를 탐색하는 방법
worker.print() x -> worker.__proto__.print() x
-> worker.__proto__.__proto__.print() 발견
```

#### 1급 객체와 고차함수

```js
// 함수는 __proto__와 prototype 을 둘다 가지고 있기 때문에 혼동주의
Worker.__proto__ === Funtion.prototype;
Function.prototype.__proto__ === Object.prototype;
```

- 함수 프로토타입의 \_\_proto\_\_는 Object의 프로토타입을 상속받기 때문에 객체이다
- 이때문에 함수를 변수나 객체의 키에 할당하거나 함수의 인자나 반환값으로 사용할 수 있다. => 1급객체
- 1급 객체 : 보통 다른 객체들에게 적용 가능한 연산을 모두 지원하는 객체
  - 변수 할당, 매개 변수, 반환 값

##### Callback 함수

- 매개변수에 전달하는 함수
- 보통 작업이 완료 된 후 전달한 함수를 실행하기 때문에 Callback 함수라는 이름이 붙여짐
- 함수내에서 인자로 받은 Callback 함수를 실행 할 수 있다.

##### 커리 함수

- 함수를 반환하는 함수

```js
function add(addNum) {
  return function (num) {
    return num + addNum;
  };
}
add(5)(4); // 9
const addFive = addMachine(5);
addFive(4); // 9
addFive(8); // 13
```
