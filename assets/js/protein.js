// Modals — using shared initModal from common.js
var modalApple = initModal('ingredientsModalApple');
var modalPeach = initModal('ingredientsModalPeach');
var modalChocolate = initModal('ingredientsModalChocolate');

// Global functions referenced by onclick attributes in HTML
function openIngredientsModalApple() { modalApple.open(); }
function closeIngredientsModalApple() { modalApple.close(); }
function openIngredientsModalPeach() { modalPeach.open(); }
function closeIngredientsModalPeach() { modalPeach.close(); }
function openIngredientsModalChocolate() { modalChocolate.open(); }
function closeIngredientsModalChocolate() { modalChocolate.close(); }

// Points card carousel (mobile) — using shared initMobileCarousel from common.js
initMobileCarousel({
  trackSelector: '.p-protein__points-track',
  prevSelector: '.p-protein__points-nav--prev',
  nextSelector: '.p-protein__points-nav--next',
  cardSelector: '.p-protein__point-card'
});
