//RIBBON ON SCROLL


//HERO SLIDER JS
let slideIndex = 0;
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

  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  slides[slideIndex].style.display = "block";

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[slideIndex].classList.add("active");
}

let timer = 7;
const _timer = timer;

setInterval(() => {
  timer--;

  if (timer < 5) {
    nextSlide();
    timer = _timer;
  }
}, 5000);



//TOP NEWS JS
function init__tabs(selector = '[data-widget="tabs"]') {
  let tabs = document.querySelectorAll(selector);
  if (!tabs.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function updateFancyIndicator(tabsRoot, tab) {
    const width = tab.offsetWidth;
    const offset = tab.offsetLeft;

    tabsRoot.style.setProperty("--active-button-width", width + "px");
    tabsRoot.style.setProperty("--active-button-offset", offset + "px");
  }

  function cubicBezier(p1x, p1y, p2x, p2y) {
    return function (t) {
      let start = 0,
        end = 1;
      for (let i = 0; i < 20; i++) {
        const mid = (start + end) / 2;
        const mt = 1 - mid;
        const x =
          3 * p1x * mt * mt * mid + 3 * p2x * mt * mid * mid + mid * mid * mid;
        if (x < t) start = mid;
        else end = mid;
      }
      const mid = (start + end) / 2;
      const mt = 1 - mid;
      return (
        3 * p1y * mt * mt * mid + 3 * p2y * mt * mid * mid + mid * mid * mid
      );
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
    const targetScroll = Math.max(
      0,
      Math.min(
        container.scrollLeft + (buttonCenter - containerCenter),
        maxScroll,
      ),
    );

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
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }

  function scrollToTarget(id, gap = 20) {
    let target = document.querySelector(id);
    if (!target) return;
    let offsetPosition =
      target.getBoundingClientRect().top + window.scrollY - gap;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  tabs.forEach((item) => {
    let tabs_controlers = item.querySelectorAll(".tabs-control");
    let tabs_scrollTop = item.dataset.scrollTop === "true";
    let tabs_autoplay = item.dataset.tabsAutoplay === "true";
    let tab_index = 0;

    let tabs_imageSlider;
    let tabs_withImages = item.dataset.type === "tabs-with-images";
    if (tabs_withImages) {
      tabs_imageSlider = item
        .closest('[data-component="tabs"]')
        ?.querySelector('[data-widget="swiper"] .swiper');
    }

    let tabsControlsWrap = item.querySelector(".tabs-controls");
    let isFancy = tabsControlsWrap?.getAttribute("data-type") === "fancy";
    let hasTrack =
      item.hasAttribute("data-tabs-track") &&
      item.getAttribute("data-tabs-track") !== "false";
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
      } else {
        console.log(
          `[Tabs] Invalid data-tabs-animate value: "${animValue}". Expected format: "duration, offset" (e.g. "350, 100"). Falling back to defaults: ${animDuration}ms duration, ${animOffset}px offset.`,
        );
      }
    } else if (hasAnimation) {
      console.log(
        `[Tabs] data-tabs-animate using defaults: ${animDuration}ms duration, ${animOffset}px offset. You can also pass custom values: data-tabs-animate="duration, offset" (e.g. "350, 100").`,
      );
    }

    if (isFancy && tabs_controlers.length) {
      updateFancyIndicator(item, tabs_controlers[0]);
    }

    tabs_controlers.forEach((tab, idx) => {
      tab.addEventListener("click", (e) => {
        let dft_tab = e.currentTarget;
        let dft_tab__aria_controls = dft_tab.getAttribute("aria-controls");
        let prevIndex = tab_index;
        tab_index = idx;

        let tab_prev_active = item.querySelector(
          '.tabs-control[aria-selected="true"]',
        );
        tab_prev_active?.setAttribute("aria-selected", "false");

        dft_tab.setAttribute("aria-selected", "true");

        if (isFancy) {
          updateFancyIndicator(item, dft_tab);
        }

        if (hasTrack) {
          scrollTabIntoView(
            tabsControlsWrap,
            dft_tab,
            hasAnimation && !reduceMotion ? animDuration : null,
          );
        }

        let panel_prev_active = item.querySelector(
          '.tabs-panel[aria-selected="true"]',
        );
        panel_prev_active?.setAttribute("aria-selected", "false");

        let dft_panel = item.querySelector(`#${dft_tab__aria_controls}`);
        dft_panel?.setAttribute("aria-selected", "true");

        if (hasAnimation && !reduceMotion && dft_panel && prevIndex !== idx) {
          const direction = idx > prevIndex ? 1 : -1;
          dft_panel.animate(
            [
              {
                opacity: 0,
                transform: `translateX(${animOffset * direction}px)`,
              },
              { opacity: 1, transform: "translateX(0)" },
            ],
            {
              duration: animDuration,
              easing: "ease-out",
            },
          );
        }

        if (tabs_scrollTop) {
          let tabs_controls_height =
            item.querySelector(".tabs-controls").offsetHeight;
          let offset = tabs_controls_height + 40;
          scrollToTarget(`#${dft_tab__aria_controls}`, offset);
        }

        if (tabs_imageSlider) {
          tabs_imageSlider.swiper.slideTo(idx);
          ScrollTrigger.refresh();
        }
      });
    });

    if (tabs_autoplay) {
      let speed = item.dataset.autoplaySpeed
        ? item.dataset.autoplaySpeed
        : 5000;
      let paused = false;
      let timer;

      ["mouseenter", "focus"].forEach((evt) =>
        item.addEventListener(evt, () => (paused = true)),
      );
      ["mouseleave", "blur"].forEach((evt) =>
        item.addEventListener(evt, () => (paused = false)),
      );

      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timer = setInterval(() => {
              if (!paused) {
                tab_index++;
                if (tab_index === tabs_controlers.length) {
                  tab_index = 0;
                }
                tabs_controlers[tab_index].click();
              }
            }, speed);
          } else {
            clearInterval(timer);
          }
        });
      });

      observer.observe(item);
    }

    if (isFancy) {
      window.addEventListener("resize", () => {
        let activeTab = item.querySelector(
          '.tabs-control[aria-selected="true"]',
        );
        if (activeTab) {
          updateFancyIndicator(item, activeTab);
        }
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init__tabs();
});
//END TOP NEWS JS








//TOP TOPIC JS
const slider = document.querySelector("[data-slider]");
const track = slider.querySelector("[data-slider-track]");
const prev = slider.querySelector("[data-slider-prev]");
const next = slider.querySelector("[data-slider-next]");
const dotsContainer = slider.querySelector("[data-slider-dots]");

if (track) {
  const slides = track.children;
  const totalSlides = slides.length;
  
  const createDots = () => {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('topic-slider__dot');
      dot.setAttribute('data-slider-dot', i);
      
      dot.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth;
        track.scrollTo({
          left: slideWidth * i,
          behavior: "smooth"
        });
      });
      
      dotsContainer.appendChild(dot);
    }
  };
  
  const updateActiveDot = () => {
    const trackScrollWidth = track.scrollWidth;
    const trackOuterWidth = track.clientWidth;
    const maxScroll = trackScrollWidth - trackOuterWidth;
    
    const slideWidth = slides[0].offsetWidth;
    const currentIndex = Math.round(track.scrollLeft / slideWidth);
    
    const dots = dotsContainer.querySelectorAll('[data-slider-dot]');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    prev.removeAttribute("disabled");
    next.removeAttribute("disabled");

    if (track.scrollLeft <= 0) {
      prev.setAttribute("disabled", "");
    }

    if (track.scrollLeft >= maxScroll - 1) {
      next.setAttribute("disabled", "");
    }
  };
  
  createDots();
  
  setTimeout(() => {
    updateActiveDot();
  }, 100);

  prev.addEventListener("click", () => {
    next.removeAttribute("disabled");
    track.scrollTo({
      left: track.scrollLeft - track.firstElementChild.offsetWidth,
      behavior: "smooth",
    });
  });

  next.addEventListener("click", () => {
    prev.removeAttribute("disabled");
    track.scrollTo({
      left: track.scrollLeft + track.firstElementChild.offsetWidth,
      behavior: "smooth",
    });
  });

  track.addEventListener("scroll", () => {
    updateActiveDot();
  });

  window.addEventListener('resize', () => {
    updateActiveDot();
  });
}
//END TOPIC JS
