JavaScript

### 1. this
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

<br>


### 2. use strict
- 자바스크립트 strict mode 자바스크립트를 엄격히 사용한다.
<br>

### 3. Arrow function
- 직관적으로 입출력이 가능하고 파라미터가 1개면 소괄호 생략가능하고 return값이 한개라면 {} 생략가능
<br>

### 4. Spread Operator
- ... 어레이의 대괄호를 제거해준다. 문자에 붙이면 문자를 펼처준다
- 어레이나 오브젝트는 레퍼런스 데이터 타입이라 복사하거나 합칠때는 spread operator을 사용하는게 좋다 (Deep Copy)
```
let a = [1,2,3]
let b = [4,5]
let c = [...a,...b]  // let c = [1,2,3,4,5]
```
<br>

### 5. import / export
- 사용중인 js파일에서 다른 js파일의 함수 혹은 변수를 사용하고 싶을때 import를 이용한다
- export default는 파일당 1회만 사용이 가능하다.
```
var a = 1;
var b = 2;
export {a,b}; // 여러개를 export 하고 싶을때
```
<br>

### 6. constructor
- objcet를 여러개 만들기 위해 사용한다.
```
function 기계(이름){    // constructor
  this.name = 이름;
  this.age = 15;
  this.sayHi = function(){
    console.log('안녕하세요' + this.name + ' 입니다');
  }
}
var 학생1 = new 기계('Park');
var 학생2 = new 기계('Kim');
```
<br>

### 7. prototype
- 프로토타입은 유전자다. 자바스크립트에서 어떠한 함수를 생성시 프로토타입 이라는 공간이 생긴다. 
- 프로토타입에는 기본적으로 js 내장함수가 들어있어 자식요소에서 mpa(),sort()같은 프로토타입 내장함수를 사용할 수 있다.
- 내 부모 유전자(prototype)을 검사하고 싶다면 __proto__

```
기계.prototype.gender = '남'
학생1.gender // 입력시 '남' 출력
```
<br>

### 8. 자바스크립트 브라우저 동작원리 
- stack이라는 공간에서 내가 작성한 코드를 위에서부터 한줄한줄 실행한다. stack은 하나의 공간이라 한번에 코드 한줄씩만 실행이 가능하다.
이런걸 싱글스레드라 부름 stack에서 시간이 오래걸리는 코드들은 (이벤트리스너,셋타임아웃,ajax 등) 따로 빼내어 나중에 실행 하도록 한다(비동기)
오래걸리는 코드들이 실행되면 Queue라는 공간으로가 처리가 완료된 코드들을 집어넣고 순차적으로 stack으로 올려보내 실행된다.
<br>

### 9. 자바스크립트 동기/비동기 처리
동기 : 한줄씩 차례대로 코드가 실행됨
비동기 : 오래걸리는 작업이 있으면 다른거부터 처리하는 방식 
- 자바스크립트는 기본적으로 동기식처리 한번에 코드 한줄씩 차례로 실행됨
<br>

### 10. callback함수
- 함수안에 들어가는 함수
- ex) setTimeout(  () => {  } //콜백함수 ) 자바스크립트를 순차적으로 실행시켜줌
- callback함수는 비동기처리를 해주는 문법이 아니다. 콜백함수는 함수  디자인 패턴이다
<br>

### 11. promise 
- promise는 동기를 비동기처리로 바꿔주는 문법이 아니다. promise안에서 비동기(ajax , 이벤트리스너 등) 문법을 사용 했을때
비동기적으로 처리해줄뿐 promise 자체는 비동기처리 문법이 아닌 함수를 순차적으로 실행시켜주는 디자인 패턴이다.
- promise는 콜백함수를 더욱 쉽게 사용하기위해 생긴 문법이며 함수 디자인 패턴이다.
- 콜백함수를 사용할때 콜백지옥이 발생하고 에러처리가 힘든 단점을 보안하귀 위해 생긴 문법
- then을 사용하여 함수가 정상적으로 실했됐을때 그 다음에 실행될 함수를 지정할 수 있다.
- catch를 사용하여 실패했을시 실행할 코드를 작성할 수 있다
- promise는 3가지 상태를 갖고있다. 
    1. 성공시 resolved
    2. 대기중 pending
    3. 실패시 rejected
```
let pro = new Promise( (res,reject)=> {    // promise는 성공/실패를 확인한다
    res()
})  
pro.then(()=> {
    
}).catch(()=> {
    
})
// pro가 성공했을때 then을 실행하고 실패시 catch 실행한다
```
<br>

### 12 . async
- 함수앞에 async를 붙여 promise 처럼 사용이 가능하다. 단 성공만 가능하다
 - promise를 사용할 때는 .catch()문으로 에러 핸들링 가능 but async/await은 에러 핸들링 기능이 따로 없어 try-catch() 문을 활용해야한다.
 promise는 .then() 지옥의 가능성이 있어,  코드가 길어질수록 async/await문을 사용하면 가독성이 좋다.

```
async function 더하기(){
  return 1 + 1 
}

더하기().then(function(결과){
  console.log(결과)
});
```