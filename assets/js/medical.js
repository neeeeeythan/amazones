// ─────────────────────────────────────────────
//  Medical FAQ — question data
// ─────────────────────────────────────────────
const medicalQuestionSets = {
  医療FAQ: [
    {
      id: 1,
      question: "保険は適用されますか？",
      answer: "完全自費診療（保険外診療）のため、保険は適用されません。",
    },
    {
      id: 2,
      question: "他の薬と併用できますか？",
      answer:
        "問診票に記載の上、診察時に医師にご相談ください。飲み合わせに問題のないお薬の処方を行わせていただきます。",
    },
    {
      id: 3,
      question: "ドラッグストアで購入できる薬との違いはなんですか？",
      answer:
        "医療用漢方製剤が医師の診察に基づいて選ばれるのに対して、ドラッグストアなどで販売している一般用漢方製剤は、服用者自身で選び、購入することができます。<br/>しかし、一般用漢方製剤は安全性を考慮して1日の服用量中の成分量を調整しており、多くの場合においては医療用漢方薬の50～80%程度の成分量しか含まれておりません。",
    },
    {
      id: 4,
      question: "処方薬の効果はどのくらいで出ますか？",
      answer: "2～3ヶ月使用していただくと徐々に効果があらわれます。",
    },
    {
      id: 5,
      question: "薬が合わなかった時は、どうしたら良いですか？",
      answer:
        "薬が合わなかった場合は、いつでもLINEで相談できます。お薬の変更も可能です。",
    },
    {
      id: 6,
      question: "副作用のリスクはありますか？",
      answer:
        "西洋薬のように飲み始めて数日間で治療が必要なほど大きな副作用が出るということはまれですが、吐き気や下痢といった副作用が起こる可能性はあります。",
    },
  ],
};

// ─────────────────────────────────────────────
//  Container map  (one entry per section)
// ─────────────────────────────────────────────
const medicalContainers = {
  医療FAQ: document.getElementById("医療FAQ"),
};

// ─────────────────────────────────────────────
//  State
// ─────────────────────────────────────────────
let medicalOpenIds = {
  医療FAQ: [],
};

let medicalAnimating = {
  医療FAQ: false,
};

// ─────────────────────────────────────────────
//  Toggle
// ─────────────────────────────────────────────
function toggleMedicalAccordion(section, id) {
  if (medicalAnimating[section]) return;

  const container = medicalContainers[section];
  if (!container) return;

  const header = container.querySelector(`[data-id="${id}"]`);
  if (!header) return;

  const faqElement = header.closest(".accordion_one");
  const inner = faqElement.querySelector(".accordion_inner");
  const arrow = faqElement.querySelector(".one_i");

  const wasOpen = medicalOpenIds[section].includes(id);

  medicalAnimating[section] = true;

  if (wasOpen) {
    medicalOpenIds[section] = medicalOpenIds[section].filter((v) => v !== id);

    inner.classList.remove("opening");
    inner.classList.add("closing");
    header.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      inner.classList.remove("closing", "open");
      arrow.classList.remove("active");
      header.classList.remove("open");
      medicalAnimating[section] = false;
    }, 400);
  } else {
    medicalOpenIds[section].push(id);

    inner.classList.add("open");
    header.classList.add("open");
    arrow.classList.add("active");
    header.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      inner.classList.remove("opening");
      void inner.offsetWidth;
      inner.classList.add("opening");

      setTimeout(() => {
        inner.classList.remove("opening");
        medicalAnimating[section] = false;
      }, 400);
    });
  }
}

// ─────────────────────────────────────────────
//  Render  — uses the same accordion markup as faq.js
//           but with the medical Q/A icon style
// ─────────────────────────────────────────────
function renderMedicalSection(section, questions) {
  const container = medicalContainers[section];
  if (!container) return;

  container.innerHTML = questions
    .map((faq) => {
      const isOpen = medicalOpenIds[section].includes(faq.id);
      return `<div class="accordion_one">
      <div class="accordion_header ${isOpen ? "open" : ""}"
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
          <i class="one_i ${isOpen ? "active" : ""}"></i>
        </div>
      </div>
      <div class="accordion_inner ${isOpen ? "open" : ""}">
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
//  Event delegation — same pattern as faq.js
// ─────────────────────────────────────────────
Object.keys(medicalContainers).forEach((section) => {
  const container = medicalContainers[section];
  if (!container) return;

  container.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header) toggleMedicalAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener("keydown", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleMedicalAccordion(section, Number(header.dataset.id));
    }
  });
});

// ─────────────────────────────────────────────
//  Initial render
// ─────────────────────────────────────────────
renderMedicalSection("医療FAQ", medicalQuestionSets.医療FAQ);

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
