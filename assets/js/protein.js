// Protein page — accordion + modals + carousel
initAccordion(["プロテインFAQ"]);

// Ingredient modals
var modalApple = initModal("ingredientsModalApple");
var modalPeach = initModal("ingredientsModalPeach");
var modalChocolate = initModal("ingredientsModalChocolate");

// Expose open/close globally for onclick handlers in HTML
function openIngredientsModalApple() { modalApple.open(); }
function closeIngredientsModalApple() { modalApple.close(); }
function openIngredientsModalPeach() { modalPeach.open(); }
function closeIngredientsModalPeach() { modalPeach.close(); }
function openIngredientsModalChocolate() { modalChocolate.open(); }
function closeIngredientsModalChocolate() { modalChocolate.close(); }

// Points card carousel (mobile)
initMobileCarousel({
  container: ".p-protein_points_track",
  cards: ".p-protein_point_card",
  prev: ".p-protein_points_nav--prev",
  next: ".p-protein_points_nav--next",
  breakpoint: 767
});
