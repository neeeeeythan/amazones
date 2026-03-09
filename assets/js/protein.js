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

  const faqElement = header.closest(".accordion_one");
  const inner = faqElement.querySelector(".accordion_inner");
  const arrow = faqElement.querySelector(".one_i");

  const wasOpen = proteinOpenIds[section].includes(id);

  proteinAnimating[section] = true;

  if (wasOpen) {
    proteinOpenIds[section] = proteinOpenIds[section].filter((v) => v !== id);

    inner.classList.remove("opening");
    inner.classList.add("closing");
    header.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      inner.classList.remove("closing", "open");
      arrow.classList.remove("active");
      header.classList.remove("open");
      proteinAnimating[section] = false;
    }, 400);
  } else {
    proteinOpenIds[section].push(id);

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
//  Event delegation
// ─────────────────────────────────────────────
Object.keys(proteinContainers).forEach((section) => {
  const container = proteinContainers[section];

  container.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header) toggleProteinAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener("keydown", (e) => {
    const header = e.target.closest(".accordion_header");
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
