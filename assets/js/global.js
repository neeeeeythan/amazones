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



// //TOP TOPIC JS
// // TOP TOPIC JS - Multiple Sliders with Auto-slide

// function initTopicSlider(sliderElement) {
//   if (!sliderElement) return;
  
//   const track = sliderElement.querySelector("[data-slider-track]");
//   const prev = sliderElement.querySelector("[data-slider-prev]");
//   const next = sliderElement.querySelector("[data-slider-next]");
//   const dotsContainer = sliderElement.querySelector("[data-slider-dots]");

//   if (track && dotsContainer) {
//     const slides = track.children;
//     const totalSlides = slides.length;
    
//     dotsContainer.innerHTML = '';
    
//     const createDots = () => {
//       for (let i = 0; i < totalSlides; i++) {
//         const dot = document.createElement('button');
//         dot.classList.add('topic-slider__dot');
//         dot.setAttribute('data-slider-dot', i);
        
//         dot.addEventListener('click', () => {
//           const slideWidth = slides[0].offsetWidth;
//           track.scrollTo({
//             left: slideWidth * i,
//             behavior: "smooth"
//           });
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
      
//       const dots = dotsContainer.querySelectorAll('[data-slider-dot]');
//       dots.forEach((dot, index) => {
//         if (index === currentIndex) {
//           dot.classList.add('active');
//         } else {
//           dot.classList.remove('active');
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
      
//       // Check if we're on the first slide and set margin accordingly
//       if (currentIndex === 0) {
//         console.log('=== FIRST SLIDE REACHED - SETTING MARGIN TO 240px ===');
//         track.style.marginLeft = '240px';
//       } else {
//         // Remove margin when not on first slide
//         track.style.marginLeft = '0';
//       }
//     };
    
//     createDots();
    
//     setTimeout(() => {
//       updateActiveDot();
//     }, 100);

//     if (prev) {
//       prev.addEventListener("click", () => {
//         console.log('Prev clicked');
//         if (next) next.removeAttribute("disabled");
//         track.scrollTo({
//           left: track.scrollLeft - track.firstElementChild.offsetWidth,
//           behavior: "smooth",
//         });
//       });
//     }

//     if (next) {
//       next.addEventListener("click", () => {
//         console.log('Next clicked');
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

//     window.addEventListener('resize', () => {
//       updateActiveDot();
//     });
//   }
// }

// // Initialize all sliders
// document.addEventListener('DOMContentLoaded', () => {
//   const sliders = document.querySelectorAll("[data-slider]");
//   sliders.forEach(slider => {
//     initTopicSlider(slider);
//   });
// });
// //END TOPIC JS


// // TOP TOPIC JS - Multiple Sliders Support
function initTopicSlider(sliderElement) {
  if (!sliderElement) return;
  
  const track = sliderElement.querySelector("[data-slider-track]");
  const prev = sliderElement.querySelector("[data-slider-prev]");
  const next = sliderElement.querySelector("[data-slider-next]");
  const dotsContainer = sliderElement.querySelector("[data-slider-dots]");
  const sliderContainer = document.querySelector(".slider-wrapper"); // Fixed: Changed to querySelector
  let hasSlid = false; // Flag to track if sliding has occurred

  if (track && dotsContainer) {
    const slides = track.children;
    const totalSlides = slides.length;
    
    // Clear existing dots (in case of re-initialization)
    dotsContainer.innerHTML = '';
    
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
          removePaddingOnFirstSlide(); // Remove padding when dot is clicked
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
      
      if (prev) prev.removeAttribute("disabled");
      if (next) next.removeAttribute("disabled");

      if (track.scrollLeft <= 0 && prev) {
        prev.setAttribute("disabled", "");
      }

      if (track.scrollLeft >= maxScroll - 1 && next) {
        next.setAttribute("disabled", "");
      }
    };
    
    // Function to remove padding on first slide
    const removePaddingOnFirstSlide = () => {
      if (!hasSlid && sliderContainer) {
        sliderContainer.style.paddingLeft = "0"; // Remove padding by setting to 0
        // Alternative: sliderContainer.classList.remove('pl-240'); if using class
        hasSlid = true;
      }
    };
    
    createDots();
    
    setTimeout(() => {
      updateActiveDot();
    }, 100);

    if (prev) {
      prev.addEventListener("click", () => {
        removePaddingOnFirstSlide(); // Remove padding on first slide
        if (next) next.removeAttribute("disabled");
        track.scrollTo({
          left: track.scrollLeft - track.firstElementChild.offsetWidth,
          behavior: "smooth",
        });
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        removePaddingOnFirstSlide(); // Remove padding on first slide
        if (prev) prev.removeAttribute("disabled");
        track.scrollTo({
          left: track.scrollLeft + track.firstElementChild.offsetWidth,
          behavior: "smooth",
        });
      });
    }

    track.addEventListener("scroll", () => {
      updateActiveDot();
    });

    window.addEventListener('resize', () => {
      updateActiveDot();
    });
  }
}

// Initialize all sliders
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll("[data-slider]");
  sliders.forEach(slider => {
    initTopicSlider(slider);
  });
});
// //END TOPIC JS



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
    four: "KqAKFB3-w30"
};
// Get the YouTube iframe element
const youtubePlayer = document.getElementById('youtube-player');

document.addEventListener('DOMContentLoaded', function() {
    selectVid('one');
});

function selectVid(ID) {
    // Update active thumbnail
    var thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(function(thumb) {
        thumb.classList.remove('active-thumb');
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
    
    var activeThumb = document.querySelectorAll('.thumb')[thumbIndex];
    if (activeThumb) {
        activeThumb.classList.add('active-thumb');
    }
    // Update YouTube video
    if (youtubePlayer) {
        youtubePlayer.src = "https://www.youtube.com/embed/" + videoIds[ID] + "?enablejsapi=1&autoplay=0";
    }
}

function playVid(ID) {
    selectVid(ID);
    // Auto-play the video after selection
    if (youtubePlayer) {
        youtubePlayer.src = "https://www.youtube.com/embed/" + videoIds[ID] + "?enablejsapi=1&autoplay=1";
    }
}
//END MOVIE
