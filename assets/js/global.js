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
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {        
        if (!entry.target.classList.contains('is-in-view')) {
          // Add class to trigger animation
          entry.target.classList.add('is-in-view');
          
          // Remove class after animation completes
          setTimeout(() => {
            entry.target.classList.remove('is-in-view');
          }, 1800); 
        }
        
      } else {
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of element is visible
    rootMargin: '0px'
  });

  const elementsToObserve = document.querySelectorAll(
    '.speech-bubble, ' +      
    '.clip-grow-right, ' +    
    '.service-wrapper, ' +   
    '.topic-slider, ' +       
    '.news-section, ' +       
    '.dr-amazones-container'  
  );
  
  if (elementsToObserve.length > 0) {
    elementsToObserve.forEach((element, index) => {
      observer.observe(element);
    });
  } 
});
