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
initMobileCarousel({
  container: ".p-medical_voice_grid",
  cards: ".p-medical_voice_card",
  prev: ".p-medical_voice_nav--prev",
  next: ".p-medical_voice_nav--next",
  breakpoint: 1200
});
