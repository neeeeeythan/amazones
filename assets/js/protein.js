// ─────────────────────────────────────────────
//  Protein FAQ — question data
// ─────────────────────────────────────────────
const proteinQuestionSets = {
  プロテインFAQ: [
    {
      id: 1,
      question: "プロテインは運動していなくても飲んで大丈夫？",
      answer:
        "はい、むしろ日常的な栄養補助として取り入れていただきたい商品です。美容や健康維持のために、どなたでもご利用いただけます。",
    },
    {
      id: 2,
      question: "どのタイミングで飲むのが良いですか？",
      answer:
        "朝の栄養補給・間食代わり・運動後などがオススメです。置き換えダイエットにも適しています。",
    },
    {
      id: 3,
      question: "水や牛乳、何で割るのが良いですか？",
      answer:
        "お水でも飲みやすく設計していますが、牛乳や豆乳で割るとよりコクのある味わいになります。",
    },
    {
      id: 4,
      question: "アレルギーが心配です。",
      answer:
        "原材料をご確認のうえ、ご不安な場合は医師・薬剤師にご相談ください。",
    },
  ],
};

// ─────────────────────────────────────────────
//  Container map
// ─────────────────────────────────────────────
const proteinContainers = {
  プロテインFAQ: document.getElementById("プロテインFAQ"),
};

// ─────────────────────────────────────────────
//  State
// ─────────────────────────────────────────────
let proteinOpenIds = {
  プロテインFAQ: [],
};

let proteinAnimating = {
  プロテインFAQ: false,
};

// ─────────────────────────────────────────────
//  Toggle
// ─────────────────────────────────────────────
function toggleProteinAccordion(section, id) {
  if (proteinAnimating[section]) return;

  const container = proteinContainers[section];
  if (!container) return;

  const header = container.querySelector(`[data-id="${id}"]`);
  if (!header) return;

  const faqElement = header.closest(".p-protein__faq-item");
  const inner = faqElement.querySelector(".p-protein__faq-body");
  const arrow = faqElement.querySelector(".p-protein__faq-icon");

  const wasOpen = proteinOpenIds[section].includes(id);

  proteinAnimating[section] = true;

  if (wasOpen) {
    proteinOpenIds[section] = proteinOpenIds[section].filter((v) => v !== id);

    inner.classList.remove("p-protein__faq-body--opening");
    inner.classList.add("p-protein__faq-body--closing");
    header.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      inner.classList.remove("p-protein__faq-body--closing", "p-protein__faq-body--open");
      arrow.classList.remove("p-protein__faq-icon--active");
      header.classList.remove("p-protein__faq-header--open");
      proteinAnimating[section] = false;
    }, 400);
  } else {
    proteinOpenIds[section].push(id);

    inner.classList.add("p-protein__faq-body--open");
    header.classList.add("p-protein__faq-header--open");
    arrow.classList.add("p-protein__faq-icon--active");
    header.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      inner.classList.remove("p-protein__faq-body--opening");
      void inner.offsetWidth;
      inner.classList.add("p-protein__faq-body--opening");

      setTimeout(() => {
        inner.classList.remove("p-protein__faq-body--opening");
        proteinAnimating[section] = false;
      }, 400);
    });
  }
}

// ─────────────────────────────────────────────
//  Render
// ─────────────────────────────────────────────
function renderProteinSection(section, questions) {
  const container = proteinContainers[section];
  if (!container) return;

  container.innerHTML = questions
    .map((faq) => {
      const isOpen = proteinOpenIds[section].includes(faq.id);
      return `<div class="p-protein__faq-item">
      <div class="p-protein__faq-header ${isOpen ? "p-protein__faq-header--open" : ""}"
           role="button" tabindex="0"
           aria-expanded="${isOpen}"
           data-id="${faq.id}">
        <div class="flex flex-row items-center gap-20px">
          <div class="bg-lightBlue radius-100 flex items-center justify-center"
               style="width:50px;height:50px;flex-shrink:0">
            <p class="font-outfit text-white fs-24">Q</p>
          </div>
          <p class="font-zen fw-700 fs-16">${faq.question}</p>
        </div>
        <div class="i_box">
          <i class="p-protein__faq-icon ${isOpen ? "p-protein__faq-icon--active" : ""}"></i>
        </div>
      </div>
      <div class="p-protein__faq-body ${isOpen ? "p-protein__faq-body--open" : ""}">
        <div class="box_one flex flex-row items-start gap-20px">
          <div class="radius-100 flex items-center justify-center"
               style="width:50px;height:50px;flex-shrink:0;background-color:#98a6b5">
            <p class="font-outfit text-white fs-24">A</p>
          </div>
          <p class="font-zen fw-500 fs-16 answer-text lh-210">${faq.answer}</p>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

// ─────────────────────────────────────────────
//  Event delegation
// ─────────────────────────────────────────────
Object.keys(proteinContainers).forEach((section) => {
  const container = proteinContainers[section];
  if (!container) return;

  container.addEventListener("click", (e) => {
    const header = e.target.closest(".p-protein__faq-header");
    if (header) toggleProteinAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener("keydown", (e) => {
    const header = e.target.closest(".p-protein__faq-header");
    if (header && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleProteinAccordion(section, Number(header.dataset.id));
    }
  });
});

// ─────────────────────────────────────────────
//  Initial render
// ─────────────────────────────────────────────
renderProteinSection("プロテインFAQ", proteinQuestionSets.プロテインFAQ);


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