const questions = [
  {
    id: 1,
    question: "紹介者（既存会員様）が途中で退会したらどうなりますか？",
    answer: "退会月の翌月から、通常価格に戻ります。",
  },
  {
    id: 2,
    question: "家族全員が新規入会する場合はどうなりますか",
    answer: "1人は通常価格でご入会いただき、残りの方に割引が適用されます。",
  },
  {
    id: 3,
    question: "姉がAmazonesで働いています。家族でもキャンペーンは適用されますか？",
    answer: "はい、適用可能です。",
  }
];

const faqContainer = document.getElementById("faqContainer");
let openIds = [];
const faqElements = new Map();

function toggleAccordion(id) {
  const wasOpen = openIds.includes(id);
  const faqElement = faqElements.get(id);
  if (!faqElement) return;
  
  const header = faqElement.querySelector('.accordion_header');
  const inner = faqElement.querySelector('.accordion_inner');
  const arrow = faqElement.querySelector('.one_i');
  
  // Clear any existing animation timeout for this element
  if (faqElement.dataset.animationTimeout) {
    clearTimeout(Number(faqElement.dataset.animationTimeout));
  }
  
  // Remove animation classes
  inner.classList.remove('opening', 'closing');
  
  if (wasOpen) {
    // Close accordion
    openIds = openIds.filter(openId => openId !== id);
    
    inner.classList.add('closing');
    header.setAttribute('aria-expanded', 'false');
    
    const timeout = setTimeout(() => {
      inner.classList.remove('closing', 'open');
      arrow.classList.remove('active');
      header.classList.remove('open');
      delete faqElement.dataset.animationTimeout;
    }, 400);
    
    faqElement.dataset.animationTimeout = timeout;
  } else {
    // Open accordion
    openIds.push(id);
    
    // Set initial state
    inner.classList.add('open');
    header.classList.add('open');
    arrow.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
    
    // Trigger animation
    requestAnimationFrame(() => {
      inner.classList.add('opening');
      
      const timeout = setTimeout(() => {
        inner.classList.remove('opening');
        delete faqElement.dataset.animationTimeout;
      }, 400);
      
      faqElement.dataset.animationTimeout = timeout;
    });
  }
}

function renderFAQs() {
  faqContainer.innerHTML = "";
  faqElements.clear();
  
  const fragment = document.createDocumentFragment();

  questions.forEach(faq => {
    const isOpen = openIds.includes(faq.id);
    const accordionWrapper = document.createElement("div");
    
    accordionWrapper.innerHTML = `
      <div class="accordion_one">
        <div class="accordion_header ${isOpen ? 'open' : ''}" 
             role="button" tabindex="0" 
             aria-expanded="${isOpen}" 
             data-id="${faq.id}">
          <div class="flex flex-row items-center gap-20px ">
            <img src="../assets/img/faq/icon_q.svg" />
            <p class="fw-700 fs-16">${faq.question}</p>
          </div>
          <div class="i_box">
            <i class="one_i ${isOpen ? 'active' : ''}"></i>
          </div>
        </div>
        <div class="accordion_inner ${isOpen ? 'open' : ''}">
          <div class="box_one flex flex-row items-start gap-20px ">
            <img src="../assets/img/faq/icon_a.svg" />
            <p class="fw-500 fw-16 answer-text lh-210">${faq.answer}</p>
          </div>
        </div>
      </div>
    `;
    
    // Get the actual accordion_one element
    const accordionElement = accordionWrapper.firstElementChild;
    fragment.appendChild(accordionElement);
    
    // Store the accordion_one element, not the wrapper
    faqElements.set(faq.id, accordionElement);
  });

  faqContainer.appendChild(fragment);
}

// Event delegation with debounce
let clickTimeout = null;
faqContainer.addEventListener('click', (e) => {
  const header = e.target.closest('.accordion_header');
  if (!header) return;
  
  // Debounce clicks
  if (clickTimeout) return;
  
  clickTimeout = setTimeout(() => {
    clickTimeout = null;
  }, 400);
  
  toggleAccordion(Number(header.dataset.id));
});

faqContainer.addEventListener('keydown', (e) => {
  const header = e.target.closest('.accordion_header');
  if (header && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    
    // Debounce key presses
    if (clickTimeout) return;
    
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
    }, 400);
    
    toggleAccordion(Number(header.dataset.id));
  }
});

// Initial render
renderFAQs();