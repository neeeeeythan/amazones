// ─────────────────────────────────────────────
//  Nav smooth scroll
// ─────────────────────────────────────────────
document.querySelectorAll('.p-storedetail_links-nav a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─────────────────────────────────────────────
//  Photo Gallery Slider
//  (script is defer-loaded so DOM is already ready — no DOMContentLoaded needed)
// ─────────────────────────────────────────────
(function () {
  const sliderEl = document.getElementById("js-slider");

  // Mobile: create a dedicated hero image, swap src on thumbnail click
  if (window.innerWidth < 768) {
    var grid = document.querySelector(".slider-thumbs .grid");
    if (!grid) return;
    var thumbs = grid.querySelectorAll(".js-thumb-button");
    if (!thumbs.length) return;

    // Create hero element from first thumbnail's image
    var hero = document.createElement("div");
    hero.className = "mobile-hero";
    var heroImg = document.createElement("img");
    var firstImg = thumbs[0].querySelector("img");
    heroImg.src = firstImg.src;
    heroImg.srcset = firstImg.srcset || "";
    heroImg.alt = firstImg.alt || "";
    hero.appendChild(heroImg);
    grid.prepend(hero);

    // Mark first thumb as active
    thumbs[0].classList.add("swiper-slide-thumb-active");

    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = this.querySelector("img");
        heroImg.src = img.src;
        heroImg.srcset = img.srcset || "";
        // Update active state
        thumbs.forEach(function (b) { b.classList.remove("swiper-slide-thumb-active"); });
        this.classList.add("swiper-slide-thumb-active");
      });
    });
    return;
  }

  // Desktop: Swiper slider
  if (!sliderEl || typeof Swiper === "undefined") return;

  const swiper = new Swiper(sliderEl, {
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 400,
    allowTouchMove: false,
  });

  const thumbButtons = document.querySelectorAll(".js-thumb-button");

  function setActiveThumb(index, scroll = true) {
    thumbButtons.forEach((b) => b.classList.remove("swiper-slide-thumb-active"));
    if (thumbButtons[index]) {
      thumbButtons[index].classList.add("swiper-slide-thumb-active");
      if (scroll) {
        thumbButtons[index].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-slide-index"), 10);
      swiper.slideTo(index);
      setActiveThumb(index);
    });
  });

  swiper.on("slideChange", function () {
    setActiveThumb(swiper.activeIndex);
  });

  setActiveThumb(0, false);
}());

// Service section — mobile slider
(function () {
  var container = document.querySelector('.service-container');
  var btnPrev = document.querySelector('.p-service_nav--prev');
  var btnNext = document.querySelector('.p-service_nav--next');
  if (!container || !btnPrev || !btnNext) return;

  var cards = container.querySelectorAll('.service-wrapper');
  var total = cards.length;
  var current = 0;

  function isMobile() { return window.innerWidth <= 1024; }

  function goTo(index) {
    if (!isMobile()) return;
    current = (index + total) % total;
    container.style.transform = 'translateX(-' + current * 100 + '%)';
  }

  btnPrev.addEventListener('click', function () { goTo(current - 1); });
  btnNext.addEventListener('click', function () { goTo(current + 1); });

  window.addEventListener('resize', function () {
    if (!isMobile()) { container.style.transform = ''; current = 0; }
  });
}());
