// MODAL APPLE
function openIngredientsModalApple() {
  document.getElementById('ingredientsModalApple').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeIngredientsModalApple() {
  const overlay = document.getElementById('ingredientsModalApple');
  overlay.classList.remove('is-open');
  overlay.addEventListener('transitionend', function restore() {
    document.body.style.overflow = '';
    overlay.removeEventListener('transitionend', restore);
  });
}

document.getElementById('ingredientsModalApple').addEventListener('click', function(e) {
  if (e.target === this) closeIngredientsModalApple();
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeIngredientsModalApple(); });

// MODAL PEACH
function openIngredientsModalPeach() {
  document.getElementById('ingredientsModalPeach').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeIngredientsModalPeach() {
  const overlay = document.getElementById('ingredientsModalPeach');
  overlay.classList.remove('is-open');
  overlay.addEventListener('transitionend', function restore() {
    document.body.style.overflow = '';
    overlay.removeEventListener('transitionend', restore);
  });
}

document.getElementById('ingredientsModalPeach').addEventListener('click', function(e) {
  if (e.target === this) closeIngredientsModalPeach();
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeIngredientsModalPeach(); });

// MODAL CHOCOLATE
function openIngredientsModalChocolate() {
  document.getElementById('ingredientsModalChocolate').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeIngredientsModalChocolate() {
  const overlay = document.getElementById('ingredientsModalChocolate');
  overlay.classList.remove('is-open');
  overlay.addEventListener('transitionend', function restore() {
    document.body.style.overflow = '';
    overlay.removeEventListener('transitionend', restore);
  });
}

document.getElementById('ingredientsModalChocolate').addEventListener('click', function(e) {
  if (e.target === this) closeIngredientsModalChocolate();
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeIngredientsModalChocolate(); });

// ─────────────────────────────────────────────
//  Points card carousel (mobile)
// ─────────────────────────────────────────────
(function () {
  const track = document.querySelector(".p-protein__points-track");
  const btnPrev = document.querySelector(".p-protein__points-nav--prev");
  const btnNext = document.querySelector(".p-protein__points-nav--next");
  if (!track || !btnPrev || !btnNext) return;

  const cards = track.querySelectorAll(".p-protein__point-card");
  const total = cards.length;
  let current = 0;

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function goTo(index) {
    if (!isMobile()) return;
    current = (index + total) % total;
    track.style.transform = "translateX(-" + current * 100 + "%)";
  }

  btnPrev.addEventListener("click", function () {
    goTo(current - 1);
  });

  btnNext.addEventListener("click", function () {
    goTo(current + 1);
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) {
      track.style.transform = "";
      current = 0;
    }
  });
})();
