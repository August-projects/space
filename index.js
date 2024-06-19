"use strict";
import Swiper from 'swiper';

//side nav
const side = document.querySelector("nav").innerHTML;
document.querySelector("header").insertAdjacentHTML('beforeend', side);

//header
document.querySelectorAll("nav li, header>ul li").forEach(function (li) {
    li.addEventListener("click", function () {
        let menu = Array.from(document.querySelectorAll('nav li')).indexOf(this);
        if (menu < 0) {
            menu = Array.from(document.querySelectorAll('header>ul li')).indexOf(this);
        }
        let move = document.querySelectorAll('section')[menu].offsetTop;

        window.scroll({
            top: move,
            left: 0,
            behavior: "smooth"
        });

        let closeMobile = document.querySelector("header nav ul").classList.contains("on");
        if(closeMobile) {
            document.querySelector("header nav ul.on").classList.remove("on");
            document.querySelector("header .mobile.on").classList.remove("on");
        }

        return false;
    })
})

//mobile nav
document.querySelector(".mobile").addEventListener("click", (e) => {
    document.querySelector("header nav>ul").classList.toggle("on");
    document.querySelector("body").classList.toggle("no-scroll");
    document.querySelector(".mobile").classList.toggle("on");   
})

//ufo
setInterval(function () {
    let x = Math.ceil(Math.random() * 50);
    let y = Math.ceil(Math.random() * 50);
    let sloganUfo = document.querySelector(".ufo");
    sloganUfo.style.left = x + "%";
    sloganUfo.style.top = y + "%";
}, 500)

//typing text
function typingEffect(elementSector, interval = 200, delay = 30) {
    let element = document.querySelector(elementSector);
    let text = element.innerHTML;
    let textNum = 0;
    let tag = false;

    let typingEffect = setInterval(function () {
        textNum++;
        if (text[textNum] === "<") tag = true;
        if (text[textNum] === ">") tag = false;

        if (!tag) {
            let typing = text.substring(0, textNum);
            element.innerHTML = typing;
        }
        if (textNum > text.length + delay) {
            textNum = 0;
        }
    }, interval)
}

typingEffect(".sloganT", 200, 30);
typingEffect(".about h2", 200, 30);
typingEffect(".portfolio h2", 200, 30);

//mouse interaction
function move_bg(element, x, y, speed) {
    element.style.margin = (y * speed) + "px 0 0 " + (x * speed) + "px";
}

window.addEventListener('mousemove', function (e) {
    let x = e.clientX - window.innerWidth / 2;
    let y = e.clientY - window.innerHeight / 2;

    const bgElements = document.querySelector('.orbit');
    if (bgElements) move_bg(bgElements, x, y, 0.1);
});

//skills button
document.querySelector(".profile button").addEventListener("click", function () {
    document.querySelector(".profile + details").classList.toggle("on");
});;

//portfolio category
const category = document.querySelectorAll(".portfolio>.wrap button");
const article = document.querySelectorAll(".portfolio article>ul>li");

category.forEach(function (e) {
    e.addEventListener("click", function () {
        let categoryIndex = Array.from(category).indexOf(this);
        let showTheArticle = e.textContent.toLocaleLowerCase();
        document.querySelector(".portfolio>.wrap .on").classList.remove("on");
        category[categoryIndex].classList.add("on");

        article.forEach(function (element) {
            if (element.classList.contains(showTheArticle)) {
                element.style.display = "block"
                element.classList.add("on");
            }
            else {
                element.style.display = "none"
                element.classList.remove("on");
            }
        })

        article.forEach(function (element) {
            if (element.classList.contains(showTheArticle)) {
                element.classList.add("on");
            }
            else {
                element.classList.remove("on");
            }
        })
    })
})

//mouse interaction of img in web portfolio
const links = document.querySelectorAll(".cording a");

links.forEach(links => {
    let webImg = links.querySelectorAll(".cording-img");
    let initialTransform = getComputedStyle(webImg[0]).getPropertyValue('transform');

    webImg.forEach(webImg => {
        links.addEventListener("mousemove", (e) => {
            const { offsetX, offsetY } = e;
            webImg.style.transform = `translate(-${offsetX / 2}px, ${offsetY / 2}px)`;
            webImg.classList.remove('hidden');
        })

        links.addEventListener("mouseleave", () => {
            webImg.style.transform = initialTransform;
            webImg.classList.add("hidden");
        });
    });
});

//modal pop up in design portfolio
const designClick = document.querySelectorAll(".design>ul>li");
const designDetails = document.querySelectorAll(".design details");
const backDrop = document.querySelector(".back-drop");
let detailIndex = 0;
//open
designClick.forEach((clicking, index) => {
    clicking.addEventListener("click", () => {
        detailIndex = index;
        designDetails[detailIndex].classList.add("on");
        backDrop.classList.add("on");
        document.body.classList.add("no-scroll");
    })
})
//close
backDrop.addEventListener("click", () => {
    let video = document.querySelector(".design details.on video");
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    document.querySelector(".design details.on").classList.remove("on");
    backDrop.classList.remove("on");
    document.body.classList.remove("no-scroll");
})



//scrollevent
window.addEventListener("scroll", function () {
    let t = window.scrollY;
    let h = window.innerHeight / 2;

    let menus = document.querySelectorAll('section');
    let menu2 = menus[1].offsetTop - h;
    let menu3 = menus[2].offsetTop - h;
    let menu4 = menus[3].offsetTop - h;

    //article merit
    let merit = document.querySelector(".merit");
    let meritHeight = merit.offsetTop - h;

    let headerOn = document.querySelector("header>ul .on");
    let movHeaderOn = document.querySelector("nav>ul .on");
    let svgOn = document.querySelectorAll(".merit .on");

    if (headerOn || movHeaderOn) {
        headerOn.classList.remove("on");
        movHeaderOn.classList.remove("on");
    }

    if (t >= 0 && t < menu2) {
        document.querySelector("header>ul li:nth-of-type(1)").classList.add("on");
        document.querySelector("header nav li:nth-of-type(1)").classList.add("on");
    }

    else if (t >= menu2 && t < menu3) {
        document.querySelector("header>ul li:nth-of-type(2)").classList.add("on");
        document.querySelector("header nav li:nth-of-type(2)").classList.add("on");
        document.querySelector(".profile img").classList.add("on");
        document.querySelector(".profile h3").classList.add("on");
        document.querySelector(".profile ul").classList.add("on");
        document.querySelector(".profile button").classList.add("on");

        document.querySelector(".study h3").classList.add("on");

        const studyHeight = document.querySelector(".study").offsetTop - h;
        if (t >= studyHeight) {

            document.querySelectorAll(".card").forEach((card) => {
                card.classList.add("in");
            })
        }

        else {
            document.querySelector(".study h3").classList.remove("on");
            document.querySelectorAll(".card").forEach((card) => {
                card.classList.remove("in");
            })
        }

        if (t >= meritHeight && t < menu3) {
            document.querySelector(".merit svg").classList.add("on");
            document.querySelectorAll(".merit .path").forEach(
                function (element) {
                    element.classList.add("on");
                }
            )
            let goods = document.querySelectorAll(".good");
            let goodArray = [];
            let numGoods = goods.length;

            for (let j = 0; j < numGoods; j++) {
                goodArray[j] = goods[j].offsetTop - h;

                if (t >= goodArray[j]) {
                    goods[j].classList.add("on");
                }
            }
        }

        else {
            document.querySelector(".merit svg").classList.remove("on");
            document.querySelectorAll(".merit .path").forEach((element) => {
                element.classList.remove("on");
            })
            document.querySelectorAll(".good").forEach((e) => {

                e.classList.remove("on");
            })
        }

        let categoryOn = document.querySelector(".portfolio > .wrap.on");
        if (categoryOn) {
            categoryOn.classList.remove("on");
        }

        let portfolioOn = document.querySelectorAll(".portfolio article .on");
        if (portfolioOn) {
            portfolioOn.forEach(function (e) {
                e.classList.remove("on");
            })
        }
    }

    else if (t >= menu3 && t < menu4) {
        document.querySelector("header>ul li:nth-of-type(3)").classList.add("on");
        document.querySelector("header nav li:nth-of-type(3)").classList.add("on");

        document.querySelector(".merit svg").classList.remove("on");
        document.querySelectorAll(".merit .path").forEach(function (element) {
            element.classList.remove("on");
        })

        document.querySelector(".portfolio>.wrap").classList.add("on");

        let categoryOn = document.querySelector(".category button.on").textContent.toLocaleLowerCase();
        article.forEach(function (element) {
            if (element.classList.contains(categoryOn)) {
                element.style.display = "block"
                element.classList.add("on");
            }
            else {
                element.classList.remove("on");
                element.style.display = "none"
            }
        })

    }

    else {
        document.querySelector("header>ul li:nth-of-type(4)").classList.add("on");
        document.querySelector("header nav li:nth-of-type(4)").classList.add("on");

    };
});

//swiper js
const swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    slidesPerView: 4,
    pagination: {
        el: ".swiper-pagination",
      },
    breakpoints: {
        "@0.280": {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        "@0.580": {
            slidesPerView: 2,
        },
        "@0.885": {
            slidesPerView: 3,
        },
        "@1.303": {
            slidesPerView: 4,
            spaceBetween: 0,
        },
    },
});

