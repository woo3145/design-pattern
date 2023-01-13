[👈 이전으로](../README.md)

#### 들어가기전

[MVC와 MVP](./mvc_mvp.md)

### MVVM (Model + View + View Model) 패턴

![mvvm](./mvvm.png)

> 출처) 코드스피츠 86 https://youtu.be/RT38Za1pkdI

- 뷰
  - UI에 관련된 것
- 뷰 모델
  - 뷰 모델이 뷰를 알고있으면 안된다. (mvvm의 목표)
  - 바인더를 통해 변화를 감지하여 뷰모델의 변경을 뷰에 반영하거나 뷰의 변화를 뷰모델에 반영한다.
    - 바인더가 뷰모델을 observe 또는
    - 뷰모델에 바인더를 연결하여 변화가 생기면 call
- 모델
  - 앱에서 사용하는 데이터에 관한 행위를 다루는 것
