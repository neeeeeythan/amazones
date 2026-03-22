
//scroll up
const scrollUpEl = document.querySelector('.scroll-up');
if (scrollUpEl) {
  scrollUpEl.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// SCROLL DOWN — click to next section; fade while actively scrolling
const scrollDownEl = document.getElementById("scroll-down-text");
if (scrollDownEl) {
  scrollDownEl.addEventListener("click", function () {
    const sections = Array.from(document.querySelectorAll("section")).filter(
      s => s.parentElement.closest("section") === null
    );
    const next = sections.find(s => s.getBoundingClientRect().top > 10);
    if (next) next.scrollIntoView({ behavior: "smooth" });
  });

  let scrollTimer = null;
  window.addEventListener("scroll", function () {
    scrollDownEl.classList.add("scrolling");
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      scrollDownEl.classList.remove("scrolling");
    }, 300);
  }, { passive: true });
}

const floatingBtn = document.getElementById("floating-menu-btn");
const floatingBtnContent = document.getElementById("floating-menu-content");
const headerFloatingMenu = document.getElementById("header-floating-menu");
const navPopup = document.getElementById("nav-menu-popup");

const isMobile = () => window.innerWidth <= 1091;

function showMenu() {
  if (isMobile()) return;
  headerFloatingMenu.classList.add("active");
  if (navPopup) navPopup.classList.add("active");
}

let menuPinned = false;

function hideMenu() {
  if (menuPinned) return;
  headerFloatingMenu.classList.remove("active");
  if (navPopup) navPopup.classList.remove("active");
}

function toggleMenu() {
  if (isMobile()) return;
  if (menuPinned) {
    menuPinned = false;
    headerFloatingMenu.classList.remove("active");
    if (navPopup) navPopup.classList.remove("active");
  } else {
    menuPinned = true;
    showMenu();
  }
}

floatingBtn.addEventListener("click", toggleMenu);
floatingBtn.addEventListener("mouseenter", showMenu);
floatingBtnContent.addEventListener("mouseenter", showMenu);
if (navPopup) navPopup.addEventListener("mouseenter", showMenu);

floatingBtnContent.addEventListener("mouseleave", function (e) {
  const rel = e.relatedTarget;
  if (rel && (headerFloatingMenu.contains(rel) || (navPopup && (navPopup === rel || navPopup.contains(rel))))) return;
  hideMenu();
});

headerFloatingMenu.addEventListener("mouseleave", function (e) {
  const rel = e.relatedTarget;
  if (navPopup && (navPopup === rel || navPopup.contains(rel))) return;
  if (
    rel !== floatingBtnContent &&
    rel !== floatingBtn &&
    !floatingBtnContent.contains(rel) &&
    !floatingBtn.contains(rel)
  ) {
    hideMenu();
  }
});

if (navPopup) {
  navPopup.addEventListener("mouseleave", function (e) {
    const rel = e.relatedTarget;
    if (rel && headerFloatingMenu.contains(rel)) return;
    hideMenu();
  });
}

//FOR ELEMENT ANIMATIONS
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains("is-in-view")) {
            // Add class to trigger animation
            entry.target.classList.add("is-in-view");

            // Remove class after animation completes
            setTimeout(() => {
              entry.target.classList.remove("is-in-view");
            }, 1800);
          }
        } else {
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of element is visible
      rootMargin: "0px",
    },
  );

  const elementsToObserve = document.querySelectorAll(
    ".speech-bubble, " +
      ".clip-grow-right, " +
      ".service-wrapper, " +
      ".topic-slider, " +
      ".news-section, " +
      ".dr-amazones-container",
  );

  if (elementsToObserve.length > 0) {
    elementsToObserve.forEach((element, index) => {
      observer.observe(element);
    });
  }
});


// HEADER MOBILE
floatingBtn.addEventListener("click", function () {
  if (!isMobile()) return;

  const overlay = document.querySelector(".mobile-header-overlay");
  const hamburger = document.querySelector(".mobile-hamburger");
  const isActive = overlay.classList.toggle("active");

  headerFloatingMenu.classList.toggle("active", isActive);
  hamburger.classList.toggle("active", isActive);
});

// Mobile accordion toggle
document.querySelectorAll('.js-sp-nav-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var section = this.closest('.sp-nav-section');
    section.classList.toggle('is-open');
  });
});

// Mobile nav X-close button
var spNavClose = document.querySelector('.sp-nav-close');
if (spNavClose) {
  spNavClose.addEventListener('click', function () {
    var overlay = document.querySelector('.mobile-header-overlay');
    var hamburger = document.querySelector('.mobile-hamburger');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    headerFloatingMenu.classList.remove('active');
  });
}

// Close overlay + reset hamburger on resize to desktop
window.addEventListener("resize", function () {
  if (!isMobile()) {
    const overlay = document.querySelector(".mobile-header-overlay");
    const hamburger = document.querySelector(".mobile-hamburger");

    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    menuPinned = false;
    hideMenu();
  }
});

// (Guarded hover listeners consolidated into showMenu/hideMenu above)


/* ============================================
   INFINITE LOOP SLIDER – works with [data-slider]
   Clones slides for seamless looping.
   Full mobile touch/swipe support.
   Generic spacer detection for all sliders.
   ============================================ */
function initSliders() {
  document.querySelectorAll("[data-slider]").forEach(function (container) {
    var track = container.querySelector("[data-slider-track]");
    var prevBtn = container.querySelector("[data-slider-prev]");
    var nextBtn = container.querySelector("[data-slider-next]");
    var dotsWrap = container.querySelector("[data-slider-dots]");

    if (!track) return;

    /* ──────────────────────────────────────────
       1. Create overflow-hidden wrapper
    ────────────────────────────────────────── */
    var wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.width = "100%";
    wrapper.style.position = "relative";
    wrapper.style.touchAction = "pan-y";
    track.parentNode.insertBefore(wrapper, track);
    wrapper.appendChild(track);

    /* ──────────────────────────────────────────
       2. Kill native scroll
    ────────────────────────────────────────── */
    track.style.overflow = "visible";
    track.style.overflowX = "visible";
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "unset";
    track.style.willChange = "transform";
    track.style.touchAction = "pan-y";

    /* ──────────────────────────────────────────
       3. Detect spacer generically:
          First <li> is a spacer if its
          .slide-content has no <img> inside.
    ────────────────────────────────────────── */
    var allItems = Array.from(track.children);
    var spacer = null;

    if (allItems.length > 1) {
      var firstContent = allItems[0].querySelector(".slide-content");
      if (firstContent) {
        var hasImage = firstContent.querySelector("img");
        var hasText = firstContent.textContent.trim().length > 0;
        if (!hasImage && !hasText) {
          spacer = allItems[0];
        }
      }
    }

    var originalSlides = spacer ? allItems.slice(1) : allItems;
    var totalOriginal = originalSlides.length;

    if (totalOriginal === 0) return;

    /* ──────────────────────────────────────────
       4. Clone all slides and append
    ────────────────────────────────────────── */
    originalSlides.forEach(function (slide) {
      var clone = slide.cloneNode(true);
      clone.classList.add("slider-clone");
      track.appendChild(clone);
    });

    var allSlideItems = Array.from(track.children);
    var slides = spacer ? allSlideItems.slice(1) : allSlideItems;

    /* ──────────────────────────────────────────
       5. State
    ────────────────────────────────────────── */
    var currentIndex = 0;
    var trackIndex = 0;
    var AUTO_INTERVAL = 20000;
    var autoTimer = null;
    var isTransitioning = false;

    /* ──────────────────────────────────────────
       6. Measure cumulative offset
    ────────────────────────────────────────── */
    function getTargetX(idx) {
      if (idx <= 0) return 0;
      var x = 0;
      for (var i = 0; i < idx && i < slides.length; i++) {
        x += slides[i].getBoundingClientRect().width;
      }
      return x;
    }

    /* ──────────────────────────────────────────
       7. Move track
    ────────────────────────────────────────── */
    function moveTrack(x, animate) {
      if (animate) {
        track.style.transition = "transform 0.5s ease";
      } else {
        track.style.transition = "none";
      }
      track.style.transform = "translateX(" + -x + "px)";
    }

    function getCurrentX() {
      var transform = window.getComputedStyle(track).transform;
      if (!transform || transform === "none") return 0;
      var matrix = transform.match(/matrix.*\((.+)\)/);
      if (matrix) {
        var values = matrix[1].split(", ");
        return parseFloat(values[4]) || 0;
      }
      return 0;
    }

    /* ──────────────────────────────────────────
       8. Dots (only for original slides)
    ────────────────────────────────────────── */
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var i = 0; i < totalOriginal; i++) {
        (function (idx) {
          var dot = document.createElement("button");
          dot.className =
            "topic-slider__dot" + (idx === 0 ? " active" : "");
          dot.setAttribute("aria-label", "Slide " + (idx + 1));
          dot.addEventListener("click", function () {
            goTo(idx);
          });
          dotsWrap.appendChild(dot);
        })(i);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      var dots = dotsWrap.querySelectorAll(".topic-slider__dot");
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === currentIndex);
      }
    }

    /* ──────────────────────────────────────────
       9. Seamless reset on transition end
    ────────────────────────────────────────── */
    track.addEventListener("transitionend", function (e) {
      if (e.target !== track) return;
      isTransitioning = false;

      if (trackIndex >= totalOriginal) {
        trackIndex = trackIndex - totalOriginal;
        currentIndex = trackIndex;
        moveTrack(getTargetX(trackIndex), false);
        updateDots();
      }

      if (trackIndex < 0) {
        trackIndex = totalOriginal + trackIndex;
        currentIndex = trackIndex;
        moveTrack(getTargetX(trackIndex), false);
        updateDots();
      }
    });

    /* ──────────────────────────────────────────
       10. Navigation
    ────────────────────────────────────────── */
    function goTo(index) {
      if (isTransitioning) return;
      trackIndex = index;
      currentIndex =
        ((index % totalOriginal) + totalOriginal) % totalOriginal;
      isTransitioning = true;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          moveTrack(getTargetX(trackIndex), true);
        });
      });

      updateDots();
      resetAutoPlay();
    }

    function goNext() {
      if (isTransitioning) return;
      trackIndex++;
      currentIndex = trackIndex % totalOriginal;
      isTransitioning = true;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          moveTrack(getTargetX(trackIndex), true);
        });
      });

      updateDots();
      resetAutoPlay();
    }

    function goPrev() {
      if (isTransitioning) return;

      if (trackIndex <= 0) {
        trackIndex = totalOriginal;
        moveTrack(getTargetX(trackIndex), false);
        track.offsetHeight; // force reflow

        trackIndex = totalOriginal - 1;
        currentIndex = trackIndex % totalOriginal;
        isTransitioning = true;

        requestAnimationFrame(function () {
          moveTrack(getTargetX(trackIndex), true);
        });
      } else {
        trackIndex--;
        currentIndex = trackIndex % totalOriginal;
        isTransitioning = true;

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            moveTrack(getTargetX(trackIndex), true);
          });
        });
      }

      updateDots();
      resetAutoPlay();
    }

    /* ──────────────────────────────────────────
       11. Auto-play
    ────────────────────────────────────────── */
    function startAutoPlay() {
      stopAutoPlay();
      autoTimer = setInterval(function () {
        goNext();
      }, AUTO_INTERVAL);
    }

    function stopAutoPlay() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function resetAutoPlay() {
      startAutoPlay();
    }

    /* ──────────────────────────────────────────
       12. Button clicks
    ────────────────────────────────────────── */
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goPrev();
      });
      prevBtn.style.cursor = "pointer";
      prevBtn.removeAttribute("disabled");
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goNext();
      });
      nextBtn.style.cursor = "pointer";
      nextBtn.removeAttribute("disabled");
    }

    /* ──────────────────────────────────────────
       13. Touch / Swipe – full mobile support
    ────────────────────────────────────────── */
    var touchStartX = 0;
    var touchStartY = 0;
    var touchMoveX = 0;
    var isDragging = false;
    var isHorizontal = null;
    var dragStartTranslateX = 0;
    var SWIPE_THRESHOLD = 40;
    var DIRECTION_LOCK_THRESHOLD = 8;

    wrapper.addEventListener("touchstart", function (e) {
      if (isTransitioning) return;
      var touch = e.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchMoveX = touch.clientX;
      isDragging = true;
      isHorizontal = null;
      dragStartTranslateX = getCurrentX();

      track.style.transition = "none";
      stopAutoPlay();
    });

    wrapper.addEventListener("touchmove", function (e) {
      if (!isDragging) return;
      var touch = e.changedTouches[0];
      var dx = touch.clientX - touchStartX;
      var dy = touch.clientY - touchStartY;

      if (isHorizontal === null) {
        if (
          Math.abs(dx) > DIRECTION_LOCK_THRESHOLD ||
          Math.abs(dy) > DIRECTION_LOCK_THRESHOLD
        ) {
          isHorizontal = Math.abs(dx) > Math.abs(dy);
        }
      }

      if (isHorizontal === false) {
        isDragging = false;
        return;
      }

      if (isHorizontal === true) {
        e.preventDefault();
        touchMoveX = touch.clientX;
        var offset = -(dragStartTranslateX + dx);
        track.style.transform = "translateX(" + offset + "px)";
      }
    });

    wrapper.addEventListener("touchend", function (e) {
      if (!isDragging) {
        resetAutoPlay();
        return;
      }
      isDragging = false;

      var dx = touchMoveX - touchStartX;

      if (isHorizontal && Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx < 0) {
          goNext();
        } else {
          goPrev();
        }
      } else {
        var x = getTargetX(trackIndex);
        moveTrack(x, true);
      }

      resetAutoPlay();
    });

    wrapper.addEventListener("touchcancel", function () {
      if (isDragging) {
        isDragging = false;
        moveTrack(getTargetX(trackIndex), true);
        resetAutoPlay();
      }
    });

    /* ──────────────────────────────────────────
       14. Pause on hover (desktop)
    ────────────────────────────────────────── */
    wrapper.addEventListener("mouseenter", stopAutoPlay);
    wrapper.addEventListener("mouseleave", startAutoPlay);

    /* ──────────────────────────────────────────
       15. Init
    ────────────────────────────────────────── */
    buildDots();
    moveTrack(0, false);
    startAutoPlay();

    console.log(
      "[Slider] " + container.closest("section").className.split(" ")[0] +
        " – " + totalOriginal + " original, " +
        slides.length + " total (with clones)" +
        (spacer ? " [spacer detected]" : " [no spacer]")
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSliders);
} else {
  initSliders();
}




//if vidoes are fetched from wp files
//TOP MOVIE
// var myMp4 = document.getElementById("mp4"),
//     myWebm = document.getElementById("webm"),
//     myVid = document.getElementById("myVideo"),
//     mp4Url = "";

// document.addEventListener('DOMContentLoaded', function() {
//     selectVid('one');
// });

// function selectVid(ID) {
//     var thumbnails = document.querySelectorAll('.thumb');
//     thumbnails.forEach(function(thumb) {
//         thumb.classList.remove('active-thumb');
//     });

//     var thumbIndex;
//     switch (ID) {
//         case "one":
//             thumbIndex = 0;
//             break;
//         case "two":
//             thumbIndex = 1;
//             break;
//         case "three":
//             thumbIndex = 2;
//             break;
//         case "four":
//             thumbIndex = 3;
//             break;
//     }

//     var activeThumb = document.querySelectorAll('.thumb')[thumbIndex];
//     if (activeThumb) {
//         activeThumb.classList.add('active-thumb');
//     }

//     switch (ID) {
//         case "one":
//             mp4Url = "https://youtu.be/9lsfbbWFtEM?si=5f8orNFlVWziLKEW";
//             break;
//         case "two":
//             mp4Url = "https://youtu.be/c-JyRI7P4zk?si=g_mZJDuDve2KTLVC";
//             break;
//         case "three":
//             mp4Url = "https://youtu.be/sf4CZ-kEXB0?si=lwJu2WZkv2eADmb8";
//             break;
//         case "four":
//             mp4Url = "https://youtu.be/KqAKFB3-w30?si=EfAq708tjmnrhlCI";
//             break;
//     }
//     myMp4.setAttribute("src", mp4Url);
//     myVid.load();
//     myVid.poster = "";
// }

// function playVid(ID) {
//     selectVid(ID);
//     myVid.play();
// }
// YouTube video IDs mapping

//if vidoes are fetched from youtube
const videoIds = {
  one: "9lsfbbWFtEM",
  two: "c-JyRI7P4zk",
  three: "sf4CZ-kEXB0",
  four: "KqAKFB3-w30",
};
// Get the YouTube iframe element
const youtubePlayer = document.getElementById("youtube-player");

document.addEventListener("DOMContentLoaded", function () {
  selectVid("one");
});

function selectVid(ID) {
  // Update active thumbnail
  var thumbnails = document.querySelectorAll(".thumb");
  thumbnails.forEach(function (thumb) {
    thumb.classList.remove("active-thumb");
  });

  var thumbIndex;
  switch (ID) {
    case "one":
      thumbIndex = 0;
      break;
    case "two":
      thumbIndex = 1;
      break;
    case "three":
      thumbIndex = 2;
      break;
    case "four":
      thumbIndex = 3;
      break;
  }

  var activeThumb = document.querySelectorAll(".thumb")[thumbIndex];
  if (activeThumb) {
    activeThumb.classList.add("active-thumb");
  }
  // Update YouTube video
  if (youtubePlayer) {
    youtubePlayer.src =
      "https://www.youtube.com/embed/" +
      videoIds[ID] +
      "?enablejsapi=1&autoplay=0";
  }
}

function playVid(ID) {
  selectVid(ID);
  // Auto-play the video after selection
  if (youtubePlayer) {
    youtubePlayer.src =
      "https://www.youtube.com/embed/" +
      videoIds[ID] +
      "?enablejsapi=1&autoplay=1";
  }
}
//END MOVIE




//scroll animation
(function () {
  "use strict";
  /* ─────────────────────────────────────────────
               3. SCROLL REVEAL — IntersectionObserver
            ───────────────────────────────────────────────── */
  const scrollReveal = {
    init() {
      const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale",
      );
      if (!targets.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target); // animate once
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      targets.forEach((el) => observer.observe(el));
    },
  };

  scrollReveal.init();

  /* ─────────────────────────────────────────────
               5. SMOOTH ANCHOR LINKS
            ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();


// Trigger opening image jump each time it enters the viewport.
(function () {
  const openingJumpImages = document.querySelectorAll(
    ".c-animation-jump"
  );
  if (!openingJumpImages.length) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) return;

  const triggerJump = (element) => {
    element.classList.remove("is-jump-once");
    // Reflow ensures the CSS animation restarts on each viewport entry.
    void element.offsetWidth;
    element.classList.add("is-jump-once");
  };

  if (!("IntersectionObserver" in window)) {
    openingJumpImages.forEach(triggerJump);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerJump(entry.target);
          return;
        }

        entry.target.classList.remove("is-jump-once");
      });
    },
    {
      threshold: 0.35,
    }
  );

  openingJumpImages.forEach((image) => observer.observe(image));
}());



// Voice slider (mobile only) — using shared initMobileCarousel from common.js
initMobileCarousel({
  trackSelector: '.p-medical_voice_grid',
  prevSelector: '.p-medical_voice_nav--prev',
  nextSelector: '.p-medical_voice_nav--next',
  cardSelector: '.p-medical_voice_card',
  breakpoint: 1200
});











/* ============================================
    C-BTN JS 
   ============================================ */


document.addEventListener("DOMContentLoaded", () => {
  const yearButtons = document.querySelectorAll('.c-btn__nav .c-btn__nav__item');
  yearButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      yearButtons.forEach(b => b.classList.remove('is-active'));
      this.classList.add('is-active');
    });
  });
});

function init__tabs(selector = '[data-widget="tabs"]') {
  let tabs = document.querySelectorAll(selector);
  if (!tabs.length) return;

}

/* ============================================
    START NEWS
   ============================================ */
function init__tabs(selector = '[data-widget="tabs"]') {
  let tabs = document.querySelectorAll(selector);
  if (!tabs.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function updateFancyIndicator(tabsRoot, tab) {
    const width = tab.offsetWidth;
    const offset = tab.offsetLeft;
    tabsRoot.style.setProperty("--active-button-width", width + "px");
    tabsRoot.style.setProperty("--active-button-offset", offset + "px");
  }

  function cubicBezier(p1x, p1y, p2x, p2y) {
    return function (t) {
      let start = 0, end = 1;
      for (let i = 0; i < 20; i++) {
        const mid = (start + end) / 2;
        const mt = 1 - mid;
        const x = 3 * p1x * mt * mt * mid + 3 * p2x * mt * mid * mid + mid * mid * mid;
        if (x < t) start = mid;
        else end = mid;
      }
      const mid = (start + end) / 2;
      const mt = 1 - mid;
      return 3 * p1y * mt * mt * mid + 3 * p2y * mt * mid * mid + mid * mid * mid;
    };
  }
  const cssEaseOut = cubicBezier(0, 0, 0.58, 1);

  function scrollTabIntoView(container, button, duration) {
    if (!container || !button) return;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const containerCenter = containerRect.left + container.clientWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = Math.max(0, Math.min(container.scrollLeft + (buttonCenter - containerCenter), maxScroll));
    if (container._scrollRaf) cancelAnimationFrame(container._scrollRaf);
    if (duration) {
      const startScroll = container.scrollLeft;
      const distance = targetScroll - startScroll;
      const startTime = performance.now();
      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = cssEaseOut(progress);
        container.scrollLeft = startScroll + distance * eased;
        if (progress < 1) container._scrollRaf = requestAnimationFrame(step);
        else container._scrollRaf = null;
      }
      container._scrollRaf = requestAnimationFrame(step);
    } else {
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }

  function scrollToTarget(id, gap = 20) {
    let target = document.querySelector(id);
    if (!target) return;
    let offsetPosition = target.getBoundingClientRect().top + window.scrollY - gap;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  tabs.forEach((item) => {
    let tabs_controlers = item.querySelectorAll(".tabs-control");
    let tabs_scrollTop = item.dataset.scrollTop === "true";
    let tabs_autoplay = item.dataset.tabsAutoplay === "true";
    let tab_index = 0;

    tabs_controlers.forEach((tab, idx) => {
      if (tab.getAttribute("aria-selected") === "true") {
        tab_index = idx;
      }
    });

    let tabsControlsWrap = item.querySelector(".tabs-controls");
    let isFancy = tabsControlsWrap?.getAttribute("data-type") === "fancy";
    let hasTrack = item.hasAttribute("data-tabs-track") && item.getAttribute("data-tabs-track") !== "false";
    let animValue = item.getAttribute("data-tabs-animate");
    let hasAnimation = animValue !== null && animValue !== "false";
    let animDuration = 500;
    let animOffset = 100;
    if (hasAnimation && animValue !== "" && animValue !== "true") {
      const parts = animValue.split(",");
      const d = parseInt(parts[0]?.trim());
      const o = parseInt(parts[1]?.trim());
      if (!isNaN(d) && !isNaN(o)) {
        animDuration = d;
        animOffset = o;
      }
    }

    if (isFancy && tabs_controlers.length) {
      updateFancyIndicator(item, tabs_controlers[tab_index]);
    }

    tabs_controlers.forEach((tab, idx) => {
      tab.addEventListener("click", (e) => {
        let dft_tab = e.currentTarget;
        let dft_tab__aria_controls = dft_tab.getAttribute("aria-controls");
        let prevIndex = tab_index;
        tab_index = idx;

        let tab_prev_active = item.querySelector('.tabs-control[aria-selected="true"]');
        if (tab_prev_active) tab_prev_active.setAttribute("aria-selected", "false");

        dft_tab.setAttribute("aria-selected", "true");

        if (isFancy) {
          updateFancyIndicator(item, dft_tab);
        }

        if (hasTrack) {
          scrollTabIntoView(tabsControlsWrap, dft_tab, hasAnimation && !reduceMotion ? animDuration : null);
        }

        let panel_prev_active = item.querySelector('.tabs-panel[aria-selected="true"]');
        if (panel_prev_active) {
          panel_prev_active.setAttribute("aria-selected", "false");
        }

        let dft_panel = item.querySelector(`#${dft_tab__aria_controls}`);
        if (dft_panel) {
          dft_panel.setAttribute("aria-selected", "true");
        }

        if (hasAnimation && !reduceMotion && dft_panel && prevIndex !== idx) {
          const direction = idx > prevIndex ? 1 : -1;
          dft_panel.animate(
            [
              { opacity: 0, transform: `translateX(${animOffset * direction}px)` },
              { opacity: 1, transform: "translateX(0)" }
            ],
            { duration: animDuration, easing: "ease-out" }
          );
        }

        if (tabs_scrollTop) {
          let tabs_controls_height = item.querySelector(".tabs-controls").offsetHeight;
          let offset = tabs_controls_height + 40;
          scrollToTarget(`#${dft_tab__aria_controls}`, offset);
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init__tabs();
});
/* ============================================
    END NEWS
   ============================================ */

/* ============================================
   COOKIE NOTICE
   ============================================ */
(function () {
  var notice = document.querySelector('.cookie-notice');
  if (!notice) return;

  if (localStorage.getItem('cookieAccepted')) {
    notice.style.display = 'none';
    return;
  }

  var okBtn = notice.querySelector('.footer-btn');
  if (okBtn) {
    okBtn.addEventListener('click', function () {
      notice.classList.remove('visible');
      notice.classList.add('hide');
      notice.addEventListener('transitionend', function () {
        notice.style.display = 'none';
      }, { once: true });
      localStorage.setItem('cookieAccepted', '1');
    });
  }

  // Double rAF ensures browser renders the off-screen state first,
  // then the transition to .visible plays smoothly
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      notice.classList.add('visible');
    });
  });
})();
/* ============================================
   END COOKIE NOTICE
   ============================================ */
