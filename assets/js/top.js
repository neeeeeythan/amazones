//RIBBON ON SCROLL

//HERO SLIDER JS
const slideContent = [
  {
    h1: "女性による<br /> 女性のための<br /> 女性専用24時間ジム",
    p: "Amazonesの特徴をみる",
    href: "#"
  },
  {
    h1: "科学的アプローチで実現する <br />最適なトレーニング環境<br />AI姿勢診断・改善",
    p: "施設・設備をみる",
    href: "#"
  },
  {
    h1: "女性トレーナーが <br />貴方を全力でサポート<br />Amazonesの ",
    p: "パーソナルトレーニング",
    href: "#"
  },
  {
    h1: "ダイエット効果を<br />最大化する <br />オンライン診療サービス",
    p: "ドクターアマゾネス",
    href: "#"
  },
  {
    h1: "諦めるのはまだ早い<br />いつ始めても遅くない！ム<br />無料体験・見学を予約する",
    p: "店舗一覧をみる",
    href: "#"
  }
];

let slideIndex = 0;
let timer = 20;
const _timer = 20;

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
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dots");
  const h1 = document.querySelector(".hero-text h1");
  const p = document.querySelector(".hero-text p");
  const a = document.querySelector(".hero-text a");

  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex].style.display = "block";

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  if (slideContent[slideIndex]) {
    h1.innerHTML = slideContent[slideIndex].h1;
    p.textContent = slideContent[slideIndex].p;
    a.href = slideContent[slideIndex].href;
  }
}

setInterval(() => {
  timer--;

  if (timer <= 0) {
    nextSlide();
    timer = _timer;
  }
}, 1000);











// //TOP TOPIC JS
