#### MVC (Model + View + Controller) 패턴

- 동작 방식

  1. 뷰에서 사용자의 Action이 Controller에 들어온다.
  2. 컨트롤러가 Action을 확인하여 Model을 업데이트하고 결과물을 받아온다.
  3. Controller가 Model을 보여줄 View를 선택한다.
  4. View가 Model을 기반으로 화면에 보여준다.

- 문제점

  - 뷰와 모델은 독립되어 있지만 뷰에서 모델을 변경 하려고 컨트롤러를 통해 소통을 함으로써 의존성이 존재함
  - 뷰와 모델이 컨트롤러와 강한 의존성을 가지게됨
    - 뷰와 모델에 변경이 있을 시 컨트롤러를 수정해야해서 유지보수하기 어려움

- 사용처

  - 클라이언트 쪽의 MVC 패턴은 위와 같은 의존성 문제 때문에 잘 사용하지 않는다.
  - 서버쪽에선 모델(db)을 가져와 컨트롤러에서 처리하고 뷰(json)를 만들고 response로 던지면 끝나기 때문에 많이 선호한다.

#### MVP (Model + View + Presenter) 패턴

- 동작 방식

  - MVC 패턴과 비슷하지만 MVP 패턴은 View가 getter, setter를 통해 그림을 그리는 권한을 Presenter에게 위임하게 된다.
  - 따라서 View와 Model의 의존성을 0으로 만들 수 있다.

- 문제점
  - View의 기능만큼 getter, setter를 만들어야 하기 때문에 view가 비대해 진다.
