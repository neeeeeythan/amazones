// ─────────────────────────────────────────────
//  Visitor FAQ — question data
// ─────────────────────────────────────────────
const visitorQuestionSets = {
  ビジターFAQ: [
    {
      id: 1,
      question: "男性もビジター利用できますか？",
      answer:
        "申し訳ございません。当ジムは女性専用施設のため、男性のご利用はできません。",
    },
    {
      id: 2,
      question: "着替えやシャワーは使えますか？",
      answer:
        "更衣室・パウダールーム・シャワー（※店舗に設備が異なります）をご利用いただけます。",
    },
    {
      id: 3,
      question: "1日に複数回利用できますか？",
      answer:
        "ビジター利用は1日1回・最大3時間までとさせていただいております。",
    },
    {
      id: 4,
      question: "初めてで不安ですが、使い方を教えてもらえますか？",
      answer:
        "申し訳ございません。簡単な設備のご案内のみとさせていただいています。<br/>トレーニングマシンの使用方法は各トレーニングマシンへ動画のQRコードを貼り付けておりますので、そちらをご確認ください。",
    },
  ],
};

// ─────────────────────────────────────────────
//  Container map
// ─────────────────────────────────────────────
const visitorContainers = {
  ビジターFAQ: document.getElementById("ビジターFAQ"),
};

// ─────────────────────────────────────────────
//  State
// ─────────────────────────────────────────────
let visitorOpenIds = {
  ビジターFAQ: [],
};

let visitorAnimating = {
  ビジターFAQ: false,
};

// ─────────────────────────────────────────────
//  Toggle
// ─────────────────────────────────────────────
function toggleVisitorAccordion(section, id) {
  if (visitorAnimating[section]) return;

  const container = visitorContainers[section];
  if (!container) return;

  const header = container.querySelector(`[data-id="${id}"]`);
  if (!header) return;

  const faqElement = header.closest(".accordion_one");
  const inner = faqElement.querySelector(".accordion_inner");
  const arrow = faqElement.querySelector(".one_i");

  const wasOpen = visitorOpenIds[section].includes(id);

  visitorAnimating[section] = true;

  if (wasOpen) {
    visitorOpenIds[section] = visitorOpenIds[section].filter((v) => v !== id);

    inner.classList.remove("opening");
    inner.classList.add("closing");
    header.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      inner.classList.remove("closing", "open");
      arrow.classList.remove("active");
      header.classList.remove("open");
      visitorAnimating[section] = false;
    }, 400);
  } else {
    visitorOpenIds[section].push(id);

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
        visitorAnimating[section] = false;
      }, 400);
    });
  }
}

// ─────────────────────────────────────────────
//  Render
// ─────────────────────────────────────────────
function renderVisitorSection(section, questions) {
  const container = visitorContainers[section];
  if (!container) return;

  container.innerHTML = questions
    .map((faq) => {
      const isOpen = visitorOpenIds[section].includes(faq.id);
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
Object.keys(visitorContainers).forEach((section) => {
  const container = visitorContainers[section];
  if (!container) return;

  container.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header) toggleVisitorAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener("keydown", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleVisitorAccordion(section, Number(header.dataset.id));
    }
  });
});

// ─────────────────────────────────────────────
//  Initial render
// ─────────────────────────────────────────────
renderVisitorSection("ビジターFAQ", visitorQuestionSets.ビジターFAQ);
