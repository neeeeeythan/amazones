//RIBBON ON SCROLL

//HERO SLIDER JS
const slideContent = [
  {
    h1: "女性による<span class =  'block'> 女性のための</span><span class = 'block'> 女性専用24時間ジム</span>",
    p: "Amazonesの特徴をみる",
    href: "about/index.html"
  },
  {
    h1: "科学的アプローチで実現する <span class =  'block'>最適なトレーニング環境</span><span class =  'block'>AI姿勢診断・改善</span>",
    p: "施設・設備をみる",
    href: "sportip/index.html"
  },
  {
    h1: "女性トレーナーが <span class= 'block'>貴方を全力でサポート</span>Amazonesの ",
    p: "パーソナルトレーニング",
    href: "personal/index.html"
  },
  {
    h1: "ダイエット効果を<span class = 'block' >最大化する </span><span class = 'block'/>オンライン診療サービス</span>",
    p: "ドクターアマゾネス",
    href: "medical/index.html"
  },
  {
    h1: "諦めるのはまだ早い<span class = 'block'>いつ始めても遅くない！ム</span><span class = 'block'>無料体験・見学を予約する</span>",
    p: "店舗一覧をみる",
    href: "reservation/index.html"
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
