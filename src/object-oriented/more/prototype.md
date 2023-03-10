[π μ΄μ μΌλ‘](./polymorphism.md)

#### μλ°μ€ν¬λ¦½νΈ νλ‘ν νμ

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

// μλ°μ€ν¬λ¦½νΈμ classλ λ¬Έλ²μ  μ€νμ΄λΌ μ¬μ€ ν¨μμμΌλ‘ prototype νλ‘νΌν°λ₯Ό κ°μ§
HardWorker.prototype;

function HardWorker() {}
HardWorker.prototype.__proto__ = Worker.prototype; // μμ μ λΆλͺ¨μ­ν μ νλ νλ‘ν νμ κ°μ²΄
HardWorker.prototype.constructor = HardWorker; //μμ μ μμ±ν κ°μ²΄λ₯Ό κ°λ¦¬ν΄
HardWorker.prototype.run = function () {
  console.log('hard working');
};
```

- ν¨μλ₯Ό ν¬ν¨νλ **λͺ¨λ  κ°μ²΄**λ \_\_proto\_\_ νλ‘νΌν°λ₯Ό κ°μ§
  - \_\_proto\_\_ : μμ μ λΆλͺ¨μ­ν μ νλ νλ‘ν νμ κ°μ²΄λ₯Ό κ°λ¦¬ν΄
- **ν¨μ κ°μ²΄λ§** prototype νλ‘νΌν°λ₯Ό κ°μ§
  - prototype : μμμκ² λκΈ°κ³  μΆμ μ μ μ (λ©μλ λ³μ λ±)
    - defaultλ‘ constructor νλ‘νΌν°λ₯Ό κ°μ§
      - constructor : μμ μ μμ±ν κ°μ²΄λ₯Ό κ°λ¦¬ν΄

#### νλ‘ν νμ μ²΄μ΄λ

```js
worker.__proto__ === HardWorker.prototype; // true
HardWorker.prototype.__proto__ === Worker.prototype; // true
Worker.prototype.__proto__ === Object.prototype; // true
Object.prototype__proto__ === null; // true

** μ workerκ°μ²΄μμ print λ©μλλ₯Ό νμνλ λ°©λ²
worker.print() x -> worker.__proto__.print() x
-> worker.__proto__.__proto__.print() λ°κ²¬
```

#### 1κΈ κ°μ²΄μ κ³ μ°¨ν¨μ

```js
// ν¨μλ __proto__μ prototype μ λλ€ κ°μ§κ³  μκΈ° λλ¬Έμ νΌλμ£Όμ
Worker.__proto__ === Funtion.prototype;
Function.prototype.__proto__ === Object.prototype;
```

- ν¨μ νλ‘ν νμμ \_\_proto\_\_λ Objectμ νλ‘ν νμμ μμλ°κΈ° λλ¬Έμ κ°μ²΄μ΄λ€
- μ΄λλ¬Έμ ν¨μλ₯Ό λ³μλ κ°μ²΄μ ν€μ ν λΉνκ±°λ ν¨μμ μΈμλ λ°νκ°μΌλ‘ μ¬μ©ν  μ μλ€. => 1κΈκ°μ²΄
- 1κΈ κ°μ²΄ : λ³΄ν΅ λ€λ₯Έ κ°μ²΄λ€μκ² μ μ© κ°λ₯ν μ°μ°μ λͺ¨λ μ§μνλ κ°μ²΄
  - λ³μ ν λΉ, λ§€κ° λ³μ, λ°ν κ°

##### Callback ν¨μ

- λ§€κ°λ³μμ μ λ¬νλ ν¨μ
- λ³΄ν΅ μμμ΄ μλ£ λ ν μ λ¬ν ν¨μλ₯Ό μ€ννκΈ° λλ¬Έμ Callback ν¨μλΌλ μ΄λ¦μ΄ λΆμ¬μ§
- ν¨μλ΄μμ μΈμλ‘ λ°μ Callback ν¨μλ₯Ό μ€ν ν  μ μλ€.

##### μ»€λ¦¬ ν¨μ

- ν¨μλ₯Ό λ°ννλ ν¨μ

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
