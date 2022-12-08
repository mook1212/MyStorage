
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

let URL_id = new URLSearchParams(window.location.search)

let data = []
db.collection('게시글목록').where('id', '==', Number(URL_id.get('id'))).get().then((res) => {
    res.forEach(a => {
        console.log(a.data());
        data.push(a.data())
    });

    let name = $('#modify-name')
    let title = $('#modify-title')
    let pw = $('#modify-pw')
    let text = $('#modify-text')

    name.val(data[0].이름)
    title.val(data[0].제목)
    pw.val(data[0].pw)
    // $('#modify-text').val(data[0].내용)


    // 수정완료 버튼 눌렀을때 비밀번호 모달창이 뜬다.
    $('#modify-clear').click(() => {
        $('.update-modal-container').css('display', 'flex')
    })


    // 수정 비밀번호 입력시 맞으면 게시글수정 아니면 alert박스
    $('#update-confirm').click(() => {
        let pw_check = $('#update-input').val()

        db.collection('게시글목록').where('id', '==', Number(URL_id.get('id'))).get().then((res) => {
            res.forEach((a) => {

                // DB패스워드와 input창에 작성한 패스워드가 일치시 삭제
                if (a.data().pw == pw_check) {
                    db.collection('게시글목록').doc(URL_id.get('id')).update({ 이름: name.val(), 내용: text.val().split('\n'), pw: pw.val(), 제목: title.val() })
                        .then(() => {
                            location.href = `http://127.0.0.1:5500/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%BC/%EC%A1%B0%EC%9D%B8%ED%94%BC%ED%94%8C%20%EB%A9%94%EC%9D%B8/QnA/detail.html?id=${URL_id.get('id')}`
                        })
                } else {
                    alert('비밀번호를 확인하여주세요')
                }

            })
        })
    })

    // 수정 비밀번호 모달창 취소
    $('#update-cancel').click(() => {
        $('.update-modal-container').css('display', 'none')
    })

})


$('#modify-cancel').click(() => {
    location.href = `http://127.0.0.1:5500/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%BC/%EC%A1%B0%EC%9D%B8%ED%94%BC%ED%94%8C%20%EB%A9%94%EC%9D%B8/QnA/detail.html?id=${URL_id.get('id')}`
})