// ─────────────────────────────────────────────
//  Voice slider (mobile only)
// ─────────────────────────────────────────────
(function () {
  const grid = document.querySelector(".p-medical__voice-grid");
  const btnPrev = document.querySelector(".p-medical__voice-nav--prev");
  const btnNext = document.querySelector(".p-medical__voice-nav--next");
  if (!grid || !btnPrev || !btnNext) return;

  const cards = grid.querySelectorAll(".p-medical__voice-card");
  const total = cards.length;
  let current = 0;

  function isMobile() {
    return window.innerWidth <= 767;
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
