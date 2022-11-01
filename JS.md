JavaScript

### 1. promise와 Callback 차이

- 둘 다 js에서 비동기 처리를 위해서 사용되는 패턴이다. callback같은 경우 함수의 처리 순서를 보장하기 위해서 함수를 중첩하게 사용되는 경우가 발생해  콜벡지옥이 발생하는 단점과 에러 처리가 힘들다는 단점이 있다. 그래서 나온게 promise이며 es6부터 정식채택되어 사용중이다.

- promise는 생성자 함수를 통해 인스턴스화하며, 비동기처리에 성공하면 resolve 메소드를 호출해서
비동기 처리 결과를 후속처리 메소드로 전달한다. 비동기 처리에 실패하면 reject 메소드를 호출해서
에러 메세지를 후속처리 메소드로 전달한다.

후속처리 메소드에는 then과 catch가 있다. 둘다 promise를 반환한다.
then을 사용하여 콜백지옥 문제를 해결할 수 있다.

### 2. asyn , await 사용법


### 3. this
- this 는 기본적으로 winodw를 가리킨다 전역객체 혹은 일반 함수에서의 this도 window를 가리킨다. 오브젝트 {}내 함수안에서의 this는 자신을 담고있는 오브젝트를 가리킨다.

- Arrow func는 this값을 함수밖에 있던거 그대로 사용한다.
내부의 this값을 변화시키지 않고 외부 this값 그대로 가져온다

- 이벤트리스너의 this는 e.currentTarget (현재 이벤트가 동작하는 곳 )을 의미한다
```
document.getElementById('aa').addEventListener('click', func(e) {
    this; // id가 aa인 요소를 가리킨다
}) 
```

- 일반 이벤트리스너에서의 this는 e.currentTarget을 의미하고 arrow func안에서의 this는 바깥의 this값을 의미한다

### 4. use strict
- 자바스크립트 strict mode 자바스크립트를 엄격히 사용한다.

### 5. Arrow function
- 직관적으로 입출력이 가능하고 파라미터가 1개면 소괄호 생략가능하고 return값이 한개라면 {} 생략가능

### 6. Spread Operator
- ... 어레이의 대괄호를 제거해준다. 문자에 붙이면 문자를 펼처준다
- 어레이나 오브젝트는 레퍼런스 데이터 타입이라 복사하거나 합칠때는 spread operator을 사용하는게 좋다 (Deep Copy)
```
let a = [1,2,3]
let b = [4,5]
let c = [...a,...b]  // let c = [1,2,3,4,5]
```

### 7 . import / export
- export default는 파일당 1회만 사용이 가능하다.
```
var a = 1;
var b = 2;
export {a,b}; // 여러개를 export 하고 싶을때
```
