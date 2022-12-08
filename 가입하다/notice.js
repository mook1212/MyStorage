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



    // 게시판 글 조회
    const makeContent = (id) => {
        const content = document.createElement("li");
        content.classList.add("content");

        $('#notice-list').append(`<div class="notice-test" data>
            <p class="notice-num" style="width: 5%; color : white">${dbdata.length + 1 - id}</p>
            <p data-id='${dbdata[id - 1].id}' id='text${id}' class='text' style="width: 65%; cursor: pointer">${dbdata[id - 1].제목}</p>
            <p style="width: 10%;">${dbdata[id - 1].이름}</p>
            <p style="width: 15%;">${dbdata[id - 1].작성일}</p>
            <p class='answer ${dbdata[id - 1].답변}'>답변대기</p>
            </div>
        `)

        // 제목 클릭시 상세페이지 넘어가기
        $(`#text${id}`).click((e) => {
            console.log(e.target.dataset.id);

            localStorage.setItem('제목', e.target.dataset.id)
            location.href = `http://127.0.0.1:5500/detail.html?id=${e.target.dataset.id}`
        })

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
$('#search').click(() => {
    let search_text = $('#search-input').val()
    console.log(search_text);

    // const search = (key) => {
    //     let search_data = []
    //     db.collection('게시글목록').where(key, '<=', search_text + '\uf8ff').get().then((res) => {
    //         res.forEach((a) => {
    //             console.log(a.data());
    //             search_data.push(a.data())
    //         })

    //         const contents = document.querySelector("#notice-list");
    //         const buttons = document.querySelector(".notice-paging");

    //         const numOfContent = search_data.length;
    //         const maxContent = 10;
    //         const maxButton = 5;
    //         const maxPage = search_data.length / 10 + 1;
    //         let page = 1;



    //         const makeContent = (id) => {
    //             const content = document.createElement("li");
    //             content.classList.add("content");
    //             $('#notice-list').append(`<div class="notice-test" data>
    // <p class="notice-num" style="width: 5%; color : white">${search_data.length + 1 - id}</p>
    // <p class='text' style="width: 65%;">${search_data[id - 1].제목}</p>
    // <p style="width: 10%;">${search_data[id - 1].이름}</p>
    // <p style="width: 15%;">${search_data[id - 1].작성일}</p>
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


    if ($('#sel-check').text() == '이름') {
        let search_data = []
        db.collection('게시글목록').get().then((res) => {
            res.forEach((a) => {
                console.log(a.data());
                search_data.push(a.data())
            })

            const contents = document.querySelector("#notice-list");
            const buttons = document.querySelector(".notice-paging");

            const numOfContent = search_data.length;
            const maxContent = 10;
            const maxButton = 5;
            const maxPage = search_data.length / 10 + 1;
            let page = 1;



            const makeContent = (id) => {
                const content = document.createElement("li");
                content.classList.add("content");
                $('#notice-list').append(`<div class="notice-test" data>
        <p class="notice-num" style="width: 5%; color : white">${search_data.length + 1 - id}</p>
        <p id='text${id}' class='text' style="width: 65%;">${search_data[id - 1].제목}</p>
        <p style="width: 10%;">${search_data[id - 1].이름}</p>
        <p style="width: 15%;">${search_data[id - 1].작성일}</p>
        <p class='answer'>답변대기</p>
        </div>
        `)

                // let ss = []
                // let xx = search_data[id].제목.match(search_text)
                // ss.push(xx)
                // console.log(ss);
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
    }



})



// 셀렉트 박스
let sel_count = 1
$('.sel-main').click(() => {
    // $('.sel-box').toggle('on')
    sel_count++
    console.log(sel_count);
    console.log(sel_count / 2);
    if (sel_count % 2 == 0) {
        $('.sel-box').fadeIn('fast')
    } else {
        $('.sel-box').fadeOut('fast')
    }
})

$('#sel-header').click(() => {
    $('#sel-check').html($('#sel-header').text())
    console.log($('#sel-check').text());
    sel_count = 1;
    $('.sel-box').fadeOut('fast')
})
$('#sel-name').click(() => {
    $('#sel-check').html($('#sel-name').text())
    console.log($('#sel-check').text());
    sel_count = 1;

    $('.sel-box').fadeOut('fast')

})

