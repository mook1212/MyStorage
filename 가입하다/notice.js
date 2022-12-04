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


// 게시판 글 목록
const contents = document.querySelector(".contents");
const buttons = document.querySelector(".buttons");

const numOfContent = 178;
const maxContent = 8;
const maxButton = 5;
const maxPage = 18;
let page = 1;

let dbdata = [];
// 게시글 시간순으로 정렬
db.collection('게시글목록').orderBy('date', 'desc').get().then((res) => {
    res.forEach((a) => {
        dbdata.push(a.data())
    })


    // 게시판
    const contents = document.querySelector("#notice-list");
    const buttons = document.querySelector(".notice-paging");

    const numOfContent = dbdata.length;
    const maxContent = 10;
    const maxButton = 5;
    const maxPage = dbdata.length / 10 + 1;
    let page = 1;



    const makeContent = (id) => {
        const content = document.createElement("li");
        content.classList.add("content");
        $('#notice-list').append(`<div class="notice-test" data>
<p class="notice-num" style="width: 5%; color : white">${dbdata.length + 1 - id}</p>
<p class='text' style="width: 65%;">${dbdata[id - 1].제목}</p>
<p style="width: 10%;">${dbdata[id - 1].이름}</p>
<p style="width: 15%;">${dbdata[id - 1].작성일}</p>
<p class='answer'>답변대기</p>
</div>
`)
        return content;
    };

    const makeButton = (id) => {
        const button = document.createElement("button");
        button.classList.add("button");
        button.dataset.num = id;
        button.innerText = id;
        button.addEventListener("click", (e) => {
            Array.prototype.forEach.call(buttons.children, (button) => {
                if (button.dataset.num) button.classList.remove("active");
            });
            e.target.classList.add("active");
            renderContent(parseInt(e.target.dataset.num));
        });
        return button;
    };

    const prev = document.createElement("button");
    const next = document.createElement("button");

    const renderContent = (page) => {
        // 목록 리스트 초기화
        while (contents.hasChildNodes()) {
            contents.removeChild(contents.lastChild);
        }
        // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
        for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
            contents.appendChild(makeContent(id));
        }
    };

    const renderButton = (page) => {
        // 버튼 리스트 초기화
        while (buttons.hasChildNodes()) {
            buttons.removeChild(buttons.lastChild);
        }
        // 화면에 최대 5개의 페이지 버튼 생성
        for (let id = page; id < page + maxButton && id <= maxPage; id++) {
            buttons.appendChild(makeButton(id));
        }
        // 첫 버튼 활성화(class="active")
        buttons.children[0].classList.add("active");

        buttons.prepend(prev);
        buttons.append(next);

        // 이전, 다음 페이지 버튼이 필요한지 체크
        if (page - maxButton < 1) buttons.removeChild(prev);
        if (page + maxButton > maxPage) buttons.removeChild(next);
    };

    const render = (page) => {
        renderContent(page);
        renderButton(page);
    };
    render(page);

    const goPrevPage = () => {
        page -= maxButton;
        render(page);
    };

    const goNextPage = () => {
        page += maxButton;
        render(page);
    };

    prev.classList.add("button", "prev");
    prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
    prev.addEventListener("click", goPrevPage);

    next.classList.add("button", "next");
    next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
    next.addEventListener("click", goNextPage);

})

// 글쓰기 기능
$('#notice-write').click(() => {
    location.href = 'http://127.0.0.1:5500/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%BC/%EC%A1%B0%EC%9D%B8%ED%94%BC%ED%94%8C%20%EB%A9%94%EC%9D%B8/QnA/write.html'
})


// 게시판 검색 기능
$('#serch').click(() => {
    let serch_text = $('#serch-input').val()
    console.log(serch_text);

    // const serch = (key) => {
    //     let serch_data = []
    //     db.collection('게시글목록').where(key, '<=', serch_text + '\uf8ff').get().then((res) => {
    //         res.forEach((a) => {
    //             console.log(a.data());
    //             serch_data.push(a.data())
    //         })

    //         const contents = document.querySelector("#notice-list");
    //         const buttons = document.querySelector(".notice-paging");

    //         const numOfContent = serch_data.length;
    //         const maxContent = 10;
    //         const maxButton = 5;
    //         const maxPage = serch_data.length / 10 + 1;
    //         let page = 1;



    //         const makeContent = (id) => {
    //             const content = document.createElement("li");
    //             content.classList.add("content");
    //             $('#notice-list').append(`<div class="notice-test" data>
    // <p class="notice-num" style="width: 5%; color : white">${serch_data.length + 1 - id}</p>
    // <p class='text' style="width: 65%;">${serch_data[id - 1].제목}</p>
    // <p style="width: 10%;">${serch_data[id - 1].이름}</p>
    // <p style="width: 15%;">${serch_data[id - 1].작성일}</p>
    // <p class='answer'>답변대기</p>
    // </div>
    // `)
    //             return content;
    //         };

    //         const makeButton = (id) => {
    //             const button = document.createElement("button");
    //             button.classList.add("button");
    //             button.dataset.num = id;
    //             button.innerText = id;
    //             button.addEventListener("click", (e) => {
    //                 Array.prototype.forEach.call(buttons.children, (button) => {
    //                     if (button.dataset.num) button.classList.remove("active");
    //                 });
    //                 e.target.classList.add("active");
    //                 renderContent(parseInt(e.target.dataset.num));
    //             });
    //             return button;
    //         };

    //         const prev = document.createElement("button");
    //         const next = document.createElement("button");

    //         const renderContent = (page) => {
    //             // 목록 리스트 초기화
    //             while (contents.hasChildNodes()) {
    //                 contents.removeChild(contents.lastChild);
    //             }
    //             // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    //             for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
    //                 contents.appendChild(makeContent(id));
    //             }
    //         };

    //         const renderButton = (page) => {
    //             // 버튼 리스트 초기화
    //             while (buttons.hasChildNodes()) {
    //                 buttons.removeChild(buttons.lastChild);
    //             }
    //             // 화면에 최대 5개의 페이지 버튼 생성
    //             for (let id = page; id < page + maxButton && id <= maxPage; id++) {
    //                 buttons.appendChild(makeButton(id));
    //             }
    //             // 첫 버튼 활성화(class="active")
    //             buttons.children[0].classList.add("active");

    //             buttons.prepend(prev);
    //             buttons.append(next);

    //             // 이전, 다음 페이지 버튼이 필요한지 체크
    //             if (page - maxButton < 1) buttons.removeChild(prev);
    //             if (page + maxButton > maxPage) buttons.removeChild(next);
    //         };

    //         const render = (page) => {
    //             renderContent(page);
    //             renderButton(page);
    //         };
    //         render(page);

    //         const goPrevPage = () => {
    //             page -= maxButton;
    //             render(page);
    //         };

    //         const goNextPage = () => {
    //             page += maxButton;
    //             render(page);
    //         };

    //         prev.classList.add("button", "prev");
    //         prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
    //         prev.addEventListener("click", goPrevPage);

    //         next.classList.add("button", "next");
    //         next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
    //         next.addEventListener("click", goNextPage);
    //     })
    // }

    // if (document.querySelectorAll('#select')[0].value == 'header') {
    //     serch('제목')
    // }
    // if (document.querySelectorAll('#select')[0].value == 'name') {
    //     serch('이름')
    // }


    let serch_data = []
    db.collection('게시글목록').where('제목', '<=', serch_text + '\uf8ff').get().then((res) => {
        res.forEach((a) => {
            console.log(a.data());
            serch_data.push(a.data())
        })

        const contents = document.querySelector("#notice-list");
        const buttons = document.querySelector(".notice-paging");

        const numOfContent = serch_data.length;
        const maxContent = 10;
        const maxButton = 5;
        const maxPage = serch_data.length / 10 + 1;
        let page = 1;



        const makeContent = (id) => {
            const content = document.createElement("li");
            content.classList.add("content");
            $('#notice-list').append(`<div class="notice-test" data>
    <p class="notice-num" style="width: 5%; color : white">${serch_data.length + 1 - id}</p>
    <p class='text' style="width: 65%;">${serch_data[id - 1].제목}</p>
    <p style="width: 10%;">${serch_data[id - 1].이름}</p>
    <p style="width: 15%;">${serch_data[id - 1].작성일}</p>
    <p class='answer'>답변대기</p>
    </div>
    `)
            return content;
        };

        const makeButton = (id) => {
            const button = document.createElement("button");
            button.classList.add("button");
            button.dataset.num = id;
            button.innerText = id;
            button.addEventListener("click", (e) => {
                Array.prototype.forEach.call(buttons.children, (button) => {
                    if (button.dataset.num) button.classList.remove("active");
                });
                e.target.classList.add("active");
                renderContent(parseInt(e.target.dataset.num));
            });
            return button;
        };

        const prev = document.createElement("button");
        const next = document.createElement("button");

        const renderContent = (page) => {
            // 목록 리스트 초기화
            while (contents.hasChildNodes()) {
                contents.removeChild(contents.lastChild);
            }
            // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
            for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
                contents.appendChild(makeContent(id));
            }
        };

        const renderButton = (page) => {
            // 버튼 리스트 초기화
            while (buttons.hasChildNodes()) {
                buttons.removeChild(buttons.lastChild);
            }
            // 화면에 최대 5개의 페이지 버튼 생성
            for (let id = page; id < page + maxButton && id <= maxPage; id++) {
                buttons.appendChild(makeButton(id));
            }
            // 첫 버튼 활성화(class="active")
            buttons.children[0].classList.add("active");

            buttons.prepend(prev);
            buttons.append(next);

            // 이전, 다음 페이지 버튼이 필요한지 체크
            if (page - maxButton < 1) buttons.removeChild(prev);
            if (page + maxButton > maxPage) buttons.removeChild(next);
        };

        const render = (page) => {
            renderContent(page);
            renderButton(page);
        };
        render(page);

        const goPrevPage = () => {
            page -= maxButton;
            render(page);
        };

        const goNextPage = () => {
            page += maxButton;
            render(page);
        };

        prev.classList.add("button", "prev");
        prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
        prev.addEventListener("click", goPrevPage);

        next.classList.add("button", "next");
        next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
        next.addEventListener("click", goNextPage);
    })

})