
// 파이어베이스 설정
const firebaseConfig = {
    apiKey: "AIzaSyBdp_8x4eixio0yS9APFYhCyuEWu7wTVd8",
    authDomain: "test-6a214.firebaseapp.com",
    projectId: "test-6a214",
    storageBucket: "test-6a214.appspot.com",
    messagingSenderId: "324318899114",
    appId: "1:324318899114:web:b7e1cca282e307b2dc59d3",
    measurementId: "G-R9Q0CYN08B"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()



// 게시글 작성
// 파이어베이스 DB에 데이터 추가
document.getElementById('write-clear').addEventListener('click', () => {

    // 게시글 작성 컨텐츠
    let title = document.getElementById('write-title').value
    let name = document.getElementById('write-name').value
    let pw = document.getElementById('write-pw').value
    let text = document.getElementById('write-text').value

    // 현재 날짜
    let today = new Date()
    let day = today.getFullYear() + '년' + (today.getMonth()+1) + '월' + today.getDate() + '일'

    db.collection('게시글목록').doc().set({ 제목 : title, 이름 : name, pw : pw, 내용 : text , 작성일 : day ,date : today})
    .then(()=> {
        alert('게시글 작성이 완료되었습니다.')
    })

})

// 게시글목록 컬렉션 안에 문서 개수 가져오기
db.collection('게시글목록').get('UZsKY5nq6ODxkFr3STFr').then(snap => {
    size = snap.size // will return the collection size
    console.log(size);
  });


document.getElementById('write-cancel').addEventListener('click', () => {
    // location.href = '/public/index.html'
    console.log('뒤로가기');
})
