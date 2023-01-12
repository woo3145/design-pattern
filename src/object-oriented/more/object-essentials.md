[👈 이전으로](../README.md)

#### Object essentials

##### Hide State 은닉

객체의 모든 속성은 모두 외부에 노출되지 않아야 한다.

- 속성이 모두 private이 아니면 객체지향 프로그래밍이 아니다.
- 객체가 데이터 은닉을 하고있지 않으면 객체가 아니라 값으로 사용된다.
  -> 값 컨텍스트로 개발이 되서 객체지향 프로그램이 무너진다.
- 데이터에 대한 내용

##### Encapsulation 캡슐화

- 메소드가 안에서 무슨일을 하는지 노출하면 안된다.
  -> 메소드를 사용하는 쪽에서 추상화된 의미로 인식해야함

```js
const EssentialObject = class {
  // 모든 속성이 private
  #name = '';
  #screen = null;
  constructor(name) {
    this.#name = name;
  }
  camouflage() {
    this.#screen = (Math.random() * 10).soString(16).replace('.', '');
  }
  // 사용하는 쪽에서 name이라는 추상화된 의미로 인식을 할 뿐
  // 안쪽에서 카모플라쥬된 이름을 반환할지 원래 이름을 반환할지 외부에선 모른다
  get name() {
    return this.#screen || this.#name;
  }
};
```

> 위 두가지를 수행하지 않으면 객체지만 객체가 아니다
> 객체가 아닌 얘가 섞이면 개체지향 자체가 깨져서 버그가 확산 될 수 있다.

##### 객체지향의 본질

객체지향 프로그램에서 변화의 여파를 막고 격리벽을 세울 수단은 아래 두가지 이다.
아래 두가지를 깨면 오염이 전파되어 전체가 깨지게 된다.

- Encapsulation of Functionality 기능의 캡슐화
- Maintenance of State 상태 관리

  - getter, setter와 같이 상태관리를 외부에 위임하면 위 두가지를 위배한 것임
    age를 은닉해도 setAge, getAge와 같은 메서드를 사용하면 age를 날로 제공한거랑 똑같음
    -> setAge를 하는 이유를 생각하고 한단계 더 생각하여 메서드를 만든다 (ex. setChild)
