const floatingBtn = document.getElementById("floating-menu-btn");
const floatingBtnContent = document.getElementById("floating-menu-content");
const headerFloatingMenu = document.getElementById("header-floating-menu");

floatingBtn.addEventListener("mouseenter", function () {
  floatingBtnContent.classList.add("active");
  headerFloatingMenu.classList.add("active");
});

floatingBtnContent.addEventListener("mouseenter", function () {
  floatingBtnContent.classList.add("active");
  headerFloatingMenu.classList.add("active");
});

floatingBtnContent.addEventListener("mouseleave", function (e) {
  const relatedTarget = e.relatedTarget;

  if (relatedTarget && headerFloatingMenu.contains(relatedTarget)) {
    return;
  }

  floatingBtnContent.classList.remove("active");
  headerFloatingMenu.classList.remove("active");
});

headerFloatingMenu.addEventListener("mouseleave", function (e) {
  const relatedTarget = e.relatedTarget;

  if (
    relatedTarget !== floatingBtnContent &&
    relatedTarget !== floatingBtn &&
    !floatingBtnContent.contains(relatedTarget) &&
    !floatingBtn.contains(relatedTarget)
  ) {
    floatingBtnContent.classList.remove("active");
    headerFloatingMenu.classList.remove("active");
  }
});

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
const isMobile = () => window.innerWidth <= 1091;

floatingBtn.addEventListener("click", function () {
  if (!isMobile()) return;

  const overlay = document.querySelector(".mobile-header-overlay");
  const hamburger = document.querySelector(".mobile-hamburger");
  const isActive = overlay.classList.toggle("active");

  headerFloatingMenu.classList.toggle("active", isActive);
  hamburger.classList.toggle("active", isActive);
});

// Close overlay + reset hamburger on resize to desktop
window.addEventListener("resize", function () {
  if (!isMobile()) {
    const overlay = document.querySelector(".mobile-header-overlay");
    const hamburger = document.querySelector(".mobile-hamburger");

    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    headerFloatingMenu.classList.remove("active");
  }
});

// Guard hover listeners so they don't fire on mobile
floatingBtn.addEventListener("mouseenter", function () {
  if (isMobile()) return;
  floatingBtnContent.classList.add("active");
  headerFloatingMenu.classList.add("active");
});

floatingBtnContent.addEventListener("mouseenter", function () {
  if (isMobile()) return;
  floatingBtnContent.classList.add("active");
  headerFloatingMenu.classList.add("active");
});

floatingBtnContent.addEventListener("mouseleave", function (e) {
  if (isMobile()) return;
  const relatedTarget = e.relatedTarget;
  if (relatedTarget && headerFloatingMenu.contains(relatedTarget)) return;
  floatingBtnContent.classList.remove("active");
  headerFloatingMenu.classList.remove("active");
});

headerFloatingMenu.addEventListener("mouseleave", function (e) {
  if (isMobile()) return;
  const relatedTarget = e.relatedTarget;
  if (
    relatedTarget !== floatingBtnContent &&
    relatedTarget !== floatingBtn &&
    !floatingBtnContent.contains(relatedTarget) &&
    !floatingBtn.contains(relatedTarget)
  ) {
    floatingBtnContent.classList.remove("active");
    headerFloatingMenu.classList.remove("active");
  }
});




// // // TOP TOPIC JS - Multiple Sliders Support
// function initTopicSlider(sliderElement) {
//   if (!sliderElement) return;

//   const track = sliderElement.querySelector("[data-slider-track]");
//   const prev = sliderElement.querySelector("[data-slider-prev]");
//   const next = sliderElement.querySelector("[data-slider-next]");
//   const dotsContainer = sliderElement.querySelector("[data-slider-dots]");
//   const sliderContainer = document.querySelector(".slider-wrapper"); // Fixed: Changed to querySelector
//   let hasSlid = false; // Flag to track if sliding has occurred

//   if (track && dotsContainer) {
//     const slides = track.children;
//     const totalSlides = slides.length;

//     // Clear existing dots (in case of re-initialization)
//     dotsContainer.innerHTML = "";

//     const createDots = () => {
//       for (let i = 0; i < totalSlides; i++) {
//         const dot = document.createElement("button");
//         dot.classList.add("topic-slider__dot");
//         dot.setAttribute("data-slider-dot", i);

//         dot.addEventListener("click", () => {
//           const slideWidth = slides[0].offsetWidth;
//           track.scrollTo({
//             left: slideWidth * i,
//             behavior: "smooth",
//           });
//           removePaddingOnFirstSlide(); // Remove padding when dot is clicked
//         });

//         dotsContainer.appendChild(dot);
//       }
//     };

//     const updateActiveDot = () => {
//       const trackScrollWidth = track.scrollWidth;
//       const trackOuterWidth = track.clientWidth;
//       const maxScroll = trackScrollWidth - trackOuterWidth;

//       const slideWidth = slides[0].offsetWidth;
//       const currentIndex = Math.round(track.scrollLeft / slideWidth);

//       const dots = dotsContainer.querySelectorAll("[data-slider-dot]");
//       dots.forEach((dot, index) => {
//         if (index === currentIndex) {
//           dot.classList.add("active");
//         } else {
//           dot.classList.remove("active");
//         }
//       });

//       if (prev) prev.removeAttribute("disabled");
//       if (next) next.removeAttribute("disabled");

//       if (track.scrollLeft <= 0 && prev) {
//         prev.setAttribute("disabled", "");
//       }

//       if (track.scrollLeft >= maxScroll - 1 && next) {
//         next.setAttribute("disabled", "");
//       }
//     };

//     // Function to remove padding on first slide
//     const removePaddingOnFirstSlide = () => {
//       if (!hasSlid && sliderContainer) {
//         sliderContainer.style.paddingLeft = "0"; // Remove padding by setting to 0
//         // Alternative: sliderContainer.classList.remove('pl-240'); if using class
//         hasSlid = true;
//       }
//     };

//     createDots();

//     setTimeout(() => {
//       updateActiveDot();
//     }, 100);

//     if (prev) {
//       prev.addEventListener("click", () => {
//         removePaddingOnFirstSlide(); // Remove padding on first slide
//         if (next) next.removeAttribute("disabled");
//         track.scrollTo({
//           left: track.scrollLeft - track.firstElementChild.offsetWidth,
//           behavior: "smooth",
//         });
//       });
//     }

//     if (next) {
//       next.addEventListener("click", () => {
//         removePaddingOnFirstSlide(); // Remove padding on first slide
//         if (prev) prev.removeAttribute("disabled");
//         track.scrollTo({
//           left: track.scrollLeft + track.firstElementChild.offsetWidth,
//           behavior: "smooth",
//         });
//       });
//     }

//     track.addEventListener("scroll", () => {
//       updateActiveDot();
//     });

//     window.addEventListener("resize", () => {
//       updateActiveDot();
//     });
//   }
// }

// // Initialize all sliders
// document.addEventListener("DOMContentLoaded", () => {
//   const sliders = document.querySelectorAll("[data-slider]");
//   sliders.forEach((slider) => {
//     initTopicSlider(slider);
//   });
// });

function initTopicSlider(sliderElement) {
  if (!sliderElement) return;

  const track = sliderElement.querySelector("[data-slider-track]");
  const prev = sliderElement.querySelector("[data-slider-prev]");
  const next = sliderElement.querySelector("[data-slider-next]");
  const dotsContainer = sliderElement.querySelector("[data-slider-dots]");
  const sliderContainer = document.querySelector(".slider-wrapper");
  let hasSlid = false;

  if (track && dotsContainer) {
    const getVisibleSlides = () =>
      Array.from(track.children).filter(
        (el) => el.offsetWidth > 0 && el.offsetHeight > 0
      );

    // ── reads the inner .slide width so CSS breakpoint changes are respected ──
    const getSlideWidth = () => {
      const firstVisible = getVisibleSlides()[0];
      if (!firstVisible) return 0;
      const innerSlide = firstVisible.querySelector(".slide");
      return (innerSlide ?? firstVisible).offsetWidth;
    };

    const createDots = () => {
      dotsContainer.innerHTML = "";
      const visibleSlides = getVisibleSlides();
      visibleSlides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("topic-slider__dot");
        dot.setAttribute("data-slider-dot", i);
        dot.addEventListener("click", () => {
          track.scrollTo({ left: getSlideWidth() * i, behavior: "smooth" });
          removePaddingOnFirstSlide();
        });
        dotsContainer.appendChild(dot);
      });
    };

    const updateActiveDot = () => {
      const visibleSlides = getVisibleSlides();
      if (!visibleSlides.length) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const slideWidth = getSlideWidth();
      const currentIndex = slideWidth > 0 ? Math.round(track.scrollLeft / slideWidth) : 0;

      dotsContainer.querySelectorAll("[data-slider-dot]").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });

      if (prev) prev.removeAttribute("disabled");
      if (next) next.removeAttribute("disabled");
      if (track.scrollLeft <= 0 && prev) prev.setAttribute("disabled", "");
      if (track.scrollLeft >= maxScroll - 1 && next) next.setAttribute("disabled", "");
    };

    const removePaddingOnFirstSlide = () => {
      if (!hasSlid && sliderContainer) {
        sliderContainer.style.paddingLeft = "0";
        hasSlid = true;
      }
    };

    if (prev) {
      prev.addEventListener("click", () => {
        removePaddingOnFirstSlide();
        next?.removeAttribute("disabled");
        track.scrollTo({ left: track.scrollLeft - getSlideWidth(), behavior: "smooth" });
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        removePaddingOnFirstSlide();
        prev?.removeAttribute("disabled");
        track.scrollTo({ left: track.scrollLeft + getSlideWidth(), behavior: "smooth" });
      });
    }

    track.addEventListener("scroll", updateActiveDot);

    window.addEventListener("resize", () => {
      createDots();
      updateActiveDot();
    });

    createDots();
    setTimeout(updateActiveDot, 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-slider]").forEach(initTopicSlider);
});







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



// ─────────────────────────────────────────────
//  Voice slider (mobile only)
// ─────────────────────────────────────────────
(function () {
  const grid = document.querySelector(".p-medical_voice_grid");
  const btnPrev = document.querySelector(".p-medical_voice_nav--prev");
  const btnNext = document.querySelector(".p-medical_voice_nav--next");
  if (!grid || !btnPrev || !btnNext) return;

  const cards = grid.querySelectorAll(".p-medical_voice_card");
  const total = cards.length;
  let current = 0;

  function isMobile() {
    return window.innerWidth <= 1200;
  }

  function goTo(index) {
    if (!isMobile()) return;
    current = (index + total) % total;
    grid.style.transform = "translateX(-" + current * 100 + "%)";
  }

  btnPrev.addEventListener("click", function () {
    goTo(current - 1);
  });

  btnNext.addEventListener("click", function () {
    goTo(current + 1);
  });

  // Reset transform when resizing to desktop
  window.addEventListener("resize", function () {
    if (!isMobile()) {
      grid.style.transform = "";
      current = 0;
    }
  });
})();













/* ============================================
    START NEWS
   ============================================ */
function init__tabs(selector = '[data-widget="tabs"]') {
  let tabs = document.querySelectorAll(selector);
  if (!tabs.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const yearButtons = document.querySelectorAll('.p-newspage__btnwrap button');

  yearButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      yearButtons.forEach(b => b.classList.remove('active-year'));
      this.classList.add('active-year');
    });
  });


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
