[👈 이전으로](../../README.md)

#### Value Context 🆚 Identifier Context

권장사항: 하나의 관점만 사용

- Value Context

  - 메모리가 달라도 안에 값이 같으면 같다고 보는 관점
  - 함수형 프로그래밍 방식에 사용
    - 끝 없는 복사본 (값을 사용 할 때마다 복사본 생성)
    - 상태 변화에 안전 (기존 값을 사용하면 불변인 새 값 만들기 때문에)
    - 연산을 기반으로 로직 전개
      - 예제나 교제와 달리 실제 구현해야할 복잡한 로직을 수학적으로 모델링하기 어려움
      - 수학적 연산이라 정교하게 설계해도 수정하기 어려움

- Identifier Context

  - 메모리의 주소가 같아야 같다고 보는 관점
  - 객체지향 프로그래밍 방식에 사용
    - 하나의 원본
    - 상태 변화를 내부에서 책임짐
    - 메세지를 기반으로 로직 전개
      - 로직 위임이 가능함

```js
const a = { a: 3, b: 5 };
const b = { a: 3, b: 5 };
// identifier context 사용
a === b; // false

// value context 사용
JSON.stringify(a) === JSON.stringify(b); // true
```