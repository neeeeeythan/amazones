const slideContent = [
  {
    heroText: "女性による<span class='u-block'> 女性のための</span><span class='u-block'> 女性専用24時間ジム</span>",
    p: "Amazonesの特徴をみる",
    href: "about/index.html",
    img: ""
  },
  {
    heroText: "科学的アプローチで実現する <span class='u-block'>最適なトレーニング環境</span>",
    p: "AI姿勢診断・改善",
    href: "sportip/index.html",
    img: "assets/img/common/img_sportip_logo.png"
  },
  {
    heroText: "女性トレーナーが <span class='u-block'>貴方を全力でサポート</span>",
    p: "パーソナルトレーニング",
    href: "personal/index.html",
    img: ""
  },
  {
    heroText: "ダイエット効<span class='u-block'>果を最大化する</span><span class='u-block'>オンライン診療サービス</span>",
    p: "ドクターアマゾネス",
    href: "medical/index.html",
    img: "assets/img/common/img_drAmazones_logo.png"
  },
  {
    heroText: "諦めるのはまだ早い<span class='u-block'>いつ始めても遅くない！</span><span class='u-block'>無料体験・見学を予約する</span>",
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
const heroText = document.querySelector(".p-top-hero__text .p-top-hero__slider-header-p");
const p = document.querySelector(".p-top-hero__text .c-reveal.p-top-hero__cta p");
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
  if (dots[slideIndex]) dots[slideIndex].classList.add("active");

  const current = slideContent[slideIndex];

  if (current) {
    const isMobile = window.innerWidth <= 767;

    let heroTextContent = current.heroText;

    if (isMobile) {
      heroTextContent = heroTextContent.replace(/<span(.*?)>/g, "<span class='u-block'>");
    }

    heroText.innerHTML = heroTextContent;
    
    if (p) p.textContent = current.p;
    
    if (a) a.href = current.href;

    if (current.img && !isMobile) {
      img.src = current.img;
      img.style.display = "block";
      img.setAttribute("alt", "スライド画像");
    } else {
      img.removeAttribute("src");
      img.style.display = "none";
      img.setAttribute("alt", "");
    }
  }
}

// Add resize event listener to handle responsive behavior
window.addEventListener('resize', () => {
  showSlides();
});

setInterval(() => {
  timer--;

  if (timer <= 0) {
    nextSlide();
    timer = _timer;
  }
}, 1000);