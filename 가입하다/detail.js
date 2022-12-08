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

let local = localStorage.getItem('제목')

// 로컬스토리지에 저장된 id값과 동일한 게시물을 가져온다
let data = []
db.collection('게시글목록').where('id', '==', Number(local)).get().then((res) => {
    res.forEach(a => {
        console.log(a.data());
        data.push(a.data())
    });
    console.log(data);


    $('.post-box').append(`
    <div class="notice-test">
        <div class='info'>
            <p data-id='${data[0].id}' id='text${data[0].id}' >${data[0].제목}</p>
            
            <div class='name'>
                <p >${data[0].이름}&nbsp |&nbsp</p>
                <p >&nbsp ${data[0].작성일}</p>
            </div>
        </div>

        <div class='text'>

        </div>
    </div>
    `)
    for (let i = 0; i < data[0].내용.length; i++) {
        $('.text').append(`
            <p>${data[0].내용[i]}</p>
        `)
    }

})

let data2 = []
db.collection('게시글목록').doc(URL_id.get('id')).collection('comment').get().then((res) => {
    res.forEach(a => {
        console.log(a.data());
        data2.push(a.data())
    });
    console.log(data2);
    // console.log(data2.length);
    console.log(data2[0].내용);


    if (data2.length != 0) {
        // console.log(data2.length);

        data2.map((a, i) => {
            console.log(123);
            $('.comment-box').append(`
            <div class="notice-test">
                <div class='info'>
                    <p >답변드립니다.</p>
                    
                    <div class='name'>
                        <p >관리자&nbsp |&nbsp</p>
                        <p >&nbsp 작성일</p>
                    </div>
                </div>
        
                <div class='comment-text c-text${i}'>
        
                </div>
            </div>
            `)

            // data2.map((a,i)=> {
            //     console.log(a);
            // })
            
        })
        
        // for (let c= 0; c < data2[c].내용.length; a++) {
        //     $(`.c-text${i}`).append(`
        //         <p>${data2[c].내용[c]}</p>
        //     `)
        // }

        // for (let c= 0; c < data2[c].내용.length; a++) {
        //     $(`.c-text${i}`).append(`
        //         <p>${data2[c].내용[c]}</p>
        //     `)
        // }





        // for (let i = 0; i < data2[i].length; i++) {
        //     console.log(123);
        //     $('.comment-box').append(`
        //     <div class="notice-test">
        //         <div class='info'>
        //             <p >답변드립니다.</p>

        //             <div class='name'>
        //                 <p >관리자&nbsp |&nbsp</p>
        //                 <p >&nbsp 작성일</p>
        //             </div>
        //         </div>

        //         <div class='comment-text c-text${i}'>

        //         </div>
        //     </div>
        //     `)

        // }


    }

})





// 게시글 수정버튼 누를시 패스워드 모달 띄워줌
$('#update').click(() => {
    location.href = `http://127.0.0.1:5500/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%BC/%EC%A1%B0%EC%9D%B8%ED%94%BC%ED%94%8C%20%EB%A9%94%EC%9D%B8/QnA/modify.html?id=${URL_id.get('id')}`

})





// 게시글 삭제버튼 누를시 패스워드 모달 띄워줌
$('#delete').click(() => {
    $('.delete-modal-container').css('display', 'flex')
})

// 게시글 삭제 모달에서 삭제버튼
$('#delete-confirm').click(() => {
    let pw = $('#delete-input').val()

    db.collection('게시글목록').where('id', '==', Number(local)).get().then((res) => {
        res.forEach((a) => {

            // DB패스워드와 input창에 작성한 패스워드가 일치시 삭제
            if (a.data().pw == pw) {
                db.collection('게시글목록').doc(local).delete()
                    .then(() => {
                        location.href = 'http://127.0.0.1:5500/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%BC/%EC%A1%B0%EC%9D%B8%ED%94%BC%ED%94%8C%20%EB%A9%94%EC%9D%B8/QnA/notice.html'
                    })
            } else {
                alert('비밀번호를 확인하여주세요')
            }

        })
    })
})

// 삭제 취소
$('#delete-cancel').click(() => {
    $('.delete-modal-container').css('display', 'none')
})


// 목록으로 돌아가기 
$('#cancel').click(() => {
    location.href = 'http://127.0.0.1:5500/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%BC/%EC%A1%B0%EC%9D%B8%ED%94%BC%ED%94%8C%20%EB%A9%94%EC%9D%B8/QnA/notice.html'
})




// 관리자 권한

if (localStorage.getItem('admin')) {
    $('.detail-btn-box').append(`
        <button id='admin-delete'>게시글 삭제</button>
    `)

    // 관리자 권한으로 게시글 삭제
    $('#admin-delete').click(() => {
        console.log('관리자삭제');
    })


    // 관리자 댓글 기능

    $('.ad-comment').append(`
    <textarea name="" id="admin-comment" cols="30" rows="10"></textarea>
    <button id='comment-btn' style='cursor:pointer;'>댓글달기</button>
    `)

    $('#comment-btn').click(() => {
        let admin_comment = $('#admin-comment').val()
        db.collection('게시글목록').doc(URL_id.get('id')).collection('comment').add({ 내용: admin_comment.split('\n') })
        console.log(1234);
    })


} else {
    console.log('없음');
}



