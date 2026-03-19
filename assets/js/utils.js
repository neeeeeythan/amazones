/**
 * Shared utility functions
 * Reusable logic for accordion, smooth scroll, mobile carousel, and modal components.
 */

// ─────────────────────────────────────────────
//  Accordion
// ─────────────────────────────────────────────
function initAccordion(containerIds, options) {
  var duration = (options && options.duration) || 400;

  var containers = {};
  var openIds = {};
  var animating = {};

  containerIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      containers[id] = el;
      openIds[id] = [];
      animating[id] = false;
    }
  });

  function toggle(section, id) {
    if (animating[section]) return;

    var container = containers[section];
    if (!container) return;

    var header = container.querySelector('[data-id="' + id + '"]');
    if (!header) return;

    var faqElement = header.closest(".accordion_one");
    var inner = faqElement.querySelector(".accordion_inner");
    var arrow = faqElement.querySelector(".one_i");
    var wasOpen = openIds[section].indexOf(id) !== -1;

    animating[section] = true;

    if (wasOpen) {
      openIds[section] = openIds[section].filter(function (v) { return v !== id; });

      inner.classList.remove("opening");
      inner.classList.add("closing");
      header.setAttribute("aria-expanded", "false");

      setTimeout(function () {
        inner.classList.remove("closing", "open");
        arrow.classList.remove("active");
        header.classList.remove("open");
        animating[section] = false;
      }, duration);
    } else {
      openIds[section].push(id);

      inner.classList.add("open");
      header.classList.add("open");
      arrow.classList.add("active");
      header.setAttribute("aria-expanded", "true");

      requestAnimationFrame(function () {
        inner.classList.remove("opening");
        void inner.offsetWidth;
        inner.classList.add("opening");

        setTimeout(function () {
          inner.classList.remove("opening");
          animating[section] = false;
        }, duration);
      });
    }
  }

  // Event delegation
  Object.keys(containers).forEach(function (section) {
    var container = containers[section];

    container.addEventListener("click", function (e) {
      var header = e.target.closest(".accordion_header");
      if (header) toggle(section, Number(header.dataset.id));
    });

    container.addEventListener("keydown", function (e) {
      var header = e.target.closest(".accordion_header");
      if (header && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        toggle(section, Number(header.dataset.id));
      }
    });
  });

  return { toggle: toggle, containers: containers, openIds: openIds };
}

// ─────────────────────────────────────────────
//  Smooth Scroll Navigation
// ─────────────────────────────────────────────
function initSmoothScroll(selector) {
  document.querySelectorAll(selector).forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ─────────────────────────────────────────────
//  Mobile Carousel
// ─────────────────────────────────────────────
function initMobileCarousel(options) {
  var container = document.querySelector(options.container);
  var btnPrev = document.querySelector(options.prev);
  var btnNext = document.querySelector(options.next);
  if (!container || !btnPrev || !btnNext) return;

  var cards = container.querySelectorAll(options.cards);
  var total = cards.length;
  var current = 0;
  var breakpoint = options.breakpoint || 767;

  function isMobile() {
    return window.innerWidth <= breakpoint;
  }

  function goTo(index) {
    if (!isMobile()) return;
    current = (index + total) % total;
    container.style.transform = "translateX(-" + current * 100 + "%)";
  }

  btnPrev.addEventListener("click", function () { goTo(current - 1); });
  btnNext.addEventListener("click", function () { goTo(current + 1); });

  window.addEventListener("resize", function () {
    if (!isMobile()) {
      container.style.transform = "";
      current = 0;
    }
  });
}

// ─────────────────────────────────────────────
//  Modal
// ─────────────────────────────────────────────
function initModal(modalId) {
  var overlay = document.getElementById(modalId);
  if (!overlay) return { open: function () {}, close: function () {} };

  function open() {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("is-open");
    overlay.addEventListener("transitionend", function restore() {
      document.body.style.overflow = "";
      overlay.removeEventListener("transitionend", restore);
    });
  }

  // Close on backdrop click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });

  return { open: open, close: close };
}
