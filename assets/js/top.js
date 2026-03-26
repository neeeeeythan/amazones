const slideContent = [
  {
    h2: "女性による<span class='u-block'> 女性のための</span><span class='u-block'> 女性専用24時間ジム</span>",
    p: "Amazonesの特徴をみる",
    href: "about/index.html",
    img: ""
  },
  {
    h2: "科学的アプローチで実現する <span class='u-block'>最適なトレーニング環境</span>",
    p: "AI姿勢診断・改善",
    href: "sportip/index.html",
    img: "assets/img/common/img_sportip_logo.png"
  },
  {
    h2: "女性トレーナーが <span class='u-block'>貴方を全力でサポート</span>Amazonesの ",
    p: "パーソナルトレーニング",
    href: "personal/index.html",
    img: ""
  },
  {
    h2: "ダイエット効<span>果を最大化する</span><span class='u-block'>オンライン診療サービス</span>",
    p: "ドクターアマゾネス",
    href: "medical/index.html",
    img: "assets/img/common/img_drAmazones_logo.png"
  },
  {
    h2: "諦めるのはまだ早い<span class='u-block'>いつ始めても遅くない！ム</span><span class='u-block'>無料体験・見学を予約する</span>",
    p: "店舗一覧をみる",
    href: "reservation/index.html",
    img: ""
  }
];

let slideIndex = 0;
let timer = 20;
const _timer = 20;

const slides = document.querySelectorAll(".p-top-hero__slide");
const dots = document.querySelectorAll(".p-top-hero__dot");
const h2 = document.querySelector(".p-top-hero__text h2");
const p = document.querySelector(".p-top-hero__text p");
const a = document.querySelector(".p-top-hero__text a");
const img = document.querySelector(".p-top-hero__slider-img");

showSlides();

function nextSlide() {
  slideIndex++;
  showSlides();
  timer = _timer;
}

function prevSlide() {
  slideIndex--;
  showSlides();
  timer = _timer;
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
}

function showSlides() {
  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex].style.display = "block";

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  const current = slideContent[slideIndex];

  if (current) {
    const isMobile = window.innerWidth <= 767;

    let h2Content = current.h2;

    if (isMobile) {
      h2Content = h2Content.replace(/<span(.*?)>/g, "<span class='u-block'>");
    }

    h2.innerHTML = h2Content;
    p.textContent = current.p;
    a.href = current.href;

    if (current.img && !isMobile) {
      img.src = current.img;
      img.style.display = "block";
    } else {
      img.removeAttribute("src");
      img.style.display = "none";
    }
  }
}
setInterval(() => {
  timer--;

  if (timer <= 0) {
    nextSlide();
    timer = _timer;
  }
}, 1000);
