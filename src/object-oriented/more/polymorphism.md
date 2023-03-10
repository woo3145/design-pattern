[π μ΄μ μΌλ‘](../README.md)

#### Polymorphism (λ€νμ±)

- λ€νμ± μμ±
  - substitution λμ²΄ κ°λ₯μ±
    μμμ΄ λΆλͺ¨λ₯Ό λμ²΄κ°λ₯
  - internal identity λ΄μ  μΌκ΄μ±
    μμ± μμ μ νμμ΄ λ΄λΆμ μΌκ΄μ± μκ² μ°Έμ‘°

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

μλ°μ€ν¬λ¦½νΈλ νλ‘ν νμ μ²΄μΈμΌλ‘ λ€νμ±μ κ΅¬νν¨

[μλ°μ€ν¬λ¦½μμ νλ‘ν νμ λμλ°©μ](./prototype.md)

```js

// λ΄μ μΌκ΄μ± λ¬μ± - νλ‘ν νμ μ²΄μ΄λμΌλ‘ κ°μ₯κ°κΉμ΄ κ²λΆν° νμ
κ°μ²΄μμ μμ±μ νμ : μκΈ°μμ  -> __proto__ -> __proto__.__proto__ -> ... λ°©μμΌλ‘ νμν¨


// λμ²΄ κ°λ₯μ± λ¬μ±
++ instanceof λμλ°©μ
worker instanceof HardWorker;

__proto__μ΄ nullμΌλκΉμ§ μ²΄μ΄λμ νκ³ κ°λ©° __proto__(λΆλͺ¨ νλ‘ν νμ κ°μ²΄)μ constructorκ°
μ°Ύλκ°κ³Ό μΌμΉνλμ§ νμΈνλ€.

worker.__proto__.constructor === Worker; // false
worker.__proto__.__proto__.constructor === Worker; // true

```

- μΈμ΄μ°¨μμμ λ€νμ±μ΄ μ§μλλ©΄ κ°μ²΄μ§ν₯ μΈμ΄μ
