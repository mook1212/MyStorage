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









// test

$('#notice-write').click(()=> {
    $('#notice-list').append(
        `
        <div class="notice-test">
        <p style="width: 10%;">1</p>
        <p class='text' style="width: 60%;">안녕하세요 메타버스 추모관 관련하여 문의드립니다.</p>
        <p style="width: 10%;">홍길동</p>
        <p style="width: 10%;">2022-11-30</p>
        <p style="width: 10%;">답변대기</p>
    </div>`
    )
})