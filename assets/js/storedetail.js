// Store detail page — accordion + smooth scroll + carousel + photo gallery

// Franchise FAQ accordion
initAccordion(["フランチャイズFAQ"]);

// Nav smooth scroll
initSmoothScroll(".p-storedetail_links-nav a");

// ─────────────────────────────────────────────
//  Photo Gallery Slider
// ─────────────────────────────────────────────
(function () {
  var sliderEl = document.getElementById("js-slider");

  // Mobile: create a dedicated hero image, swap src on thumbnail click
  if (window.innerWidth < 768) {
    var grid = document.querySelector(".slider-thumbs .grid");
    if (!grid) return;
    var thumbs = grid.querySelectorAll(".js-thumb-button");
    if (!thumbs.length) return;

    var hero = document.createElement("div");
    hero.className = "mobile-hero";
    var heroImg = document.createElement("img");
    var firstImg = thumbs[0].querySelector("img");
    heroImg.src = firstImg.src;
    heroImg.srcset = firstImg.srcset || "";
    heroImg.alt = firstImg.alt || "";
    hero.appendChild(heroImg);
    grid.prepend(hero);

    thumbs[0].classList.add("swiper-slide-thumb-active");

    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = this.querySelector("img");
        heroImg.src = img.src;
        heroImg.srcset = img.srcset || "";
        thumbs.forEach(function (b) { b.classList.remove("swiper-slide-thumb-active"); });
        this.classList.add("swiper-slide-thumb-active");
      });
    });
    return;
  }

  // Desktop: Swiper slider
  if (!sliderEl || typeof Swiper === "undefined") return;

  var swiper = new Swiper(sliderEl, {
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 400,
    allowTouchMove: false,
  });

  var thumbButtons = document.querySelectorAll(".js-thumb-button");

  function setActiveThumb(index, scroll) {
    thumbButtons.forEach(function (b) { b.classList.remove("swiper-slide-thumb-active"); });
    if (thumbButtons[index]) {
      thumbButtons[index].classList.add("swiper-slide-thumb-active");
      if (scroll !== false) {
        thumbButtons[index].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }

  thumbButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-slide-index"), 10);
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
initMobileCarousel({
  container: ".service-container",
  cards: ".service-wrapper",
  prev: ".p-service_nav--prev",
  next: ".p-service_nav--next",
  breakpoint: 767
});
