
// ─────────────────────────────────────────────
//  Franchise FAQ — question data
// ─────────────────────────────────────────────
const franchiseQuestionSets = {
  フランチャイズFAQ: [
    {
      id: 1,
      question: "経営理念は？",
      answer:
        "当社はフィットネスを通し、「女性が輝く未来をつくりたい」をスローガンに健康で喜びに満ちた未来を実現させるというミッションを果たすために事業を行っています。「会員様（お客様）」・「パートナー（協力会社）」・「社員」それぞれの夢を現実にすることができる会社としてジェンダー平等と女性のエンパワーメントの発展に貢献していきます。",
    },
    {
      id: 2,
      question: "フィットネス業界の将来の見通しは？",
      // ↓ This injects a section divider BEFORE this item
      sectionBreak: {
        icon: "../../assets/img/faq/icon_faq_label2.svg", // adjust icon path as needed
        title: "施設について",
      },
      answer:
        "フィットネス業界は、健康志向が高まりつつある中で、今後も成長が見込まれます。特に生活習慣病の予防や健康寿命の延伸を目指す人々の間で、フィットネスへの関心は高まっています。新しいトレーニングメソッドやテクノロジーの導入も、業界の発展を牽引しています。",
    },
    {
      id: 3,
      question: "この業界においての競争は激しいと思いますか？",
      answer:
        "フィットネス業界は競争が激化していますが、アマゾネスは女性専用で24時間利用可能という独自の強みを持っています。これにより、他のジムと差別化を図りつつ、多様な顧客ニーズに対応しています。市場ニーズの把握と独自性の追求により、競争を勝ち抜いていく基盤を取っています。",
    },
    {
      id: 4,
      question: "フィットネスジム運営を未経験でも開業可能ですか？",
      answer:
        "もちろん可能です。現在アマゾネスに加盟していただいたオーナー様もフィットネス業界は未経験の方がほとんどです。本部スタッフが戦略的にサポートいたしますのでご安心ください。",
    },
    {
      id: 5,
      question: "フランチャイズでジムを運営する利点は？",
      answer:
        "ジムの経営は粗利率が高いです。また、会員は月会費でストック型ビジネスのため、外的要因に左右されにくく安定収入を得られる点が最大の特徴です。",
    },
  ],
};

// ─────────────────────────────────────────────
//  Container map
// ─────────────────────────────────────────────
const franchiseContainers = {
  フランチャイズFAQ: document.getElementById("フランチャイズFAQ"),
};

// ─────────────────────────────────────────────
//  State
// ─────────────────────────────────────────────
let franchiseOpenIds = {
  フランチャイズFAQ: [],
};

let franchiseAnimating = {
  フランチャイズFAQ: false,
};

// ─────────────────────────────────────────────
//  Toggle
// ─────────────────────────────────────────────
function toggleFranchiseAccordion(section, id) {
  if (franchiseAnimating[section]) return;

  const container = franchiseContainers[section];
  if (!container) return;

  const header = container.querySelector(`[data-id="${id}"]`);
  if (!header) return;

  const faqElement = header.closest(".accordion_one");
  const inner = faqElement.querySelector(".accordion_inner");
  const arrow = faqElement.querySelector(".one_i");

  const wasOpen = franchiseOpenIds[section].includes(id);

  franchiseAnimating[section] = true;

  if (wasOpen) {
    franchiseOpenIds[section] = franchiseOpenIds[section].filter((v) => v !== id);

    inner.classList.remove("opening");
    inner.classList.add("closing");
    header.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      inner.classList.remove("closing", "open");
      arrow.classList.remove("active");
      header.classList.remove("open");
      franchiseAnimating[section] = false;
    }, 400);
  } else {
    franchiseOpenIds[section].push(id);

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
        franchiseAnimating[section] = false;
      }, 400);
    });
  }
}

// ─────────────────────────────────────────────
//  Render
// ─────────────────────────────────────────────
function renderFranchiseSection(section, questions) {
  const container = franchiseContainers[section];
  if (!container) return;

  container.innerHTML = questions
    .map((faq) => {
      const isOpen = franchiseOpenIds[section].includes(faq.id);
      const breakHtml = faq.sectionBreak
        ? `<div class="flex flex-row gap-26px items-center my-50 faq-section-break">
            <img src="${faq.sectionBreak.icon}" alt="${faq.sectionBreak.title}" />
            <h2 class="fw-700 fs-24">${faq.sectionBreak.title}</h2>
          </div>`
        : "";
      return `${breakHtml}<div class="accordion_one">
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
Object.keys(franchiseContainers).forEach((section) => {
  const container = franchiseContainers[section];

  container.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header) toggleFranchiseAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener("keydown", (e) => {
    const header = e.target.closest(".accordion_header");
    if (header && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleFranchiseAccordion(section, Number(header.dataset.id));
    }
  });
});

// ─────────────────────────────────────────────
//  Initial render
// ─────────────────────────────────────────────
renderFranchiseSection("フランチャイズFAQ", franchiseQuestionSets.フランチャイズFAQ);

// ─────────────────────────────────────────────
//  Photo Gallery Slider
//  (script is defer-loaded so DOM is already ready — no DOMContentLoaded needed)
// ─────────────────────────────────────────────
(function () {
  const sliderEl = document.getElementById("js-slider");
  if (!sliderEl || typeof Swiper === "undefined") return;

  const swiper = new Swiper(sliderEl, {
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 400,
    allowTouchMove: false,
  });

  const thumbButtons = document.querySelectorAll(".js-thumb-button");

  function setActiveThumb(index, scroll = true) {
    thumbButtons.forEach((b) => b.classList.remove("swiper-slide-thumb-active"));
    if (thumbButtons[index]) {
      thumbButtons[index].classList.add("swiper-slide-thumb-active");
      if (scroll) {
        thumbButtons[index].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-slide-index"), 10);
      swiper.slideTo(index);
      setActiveThumb(index);
    });
  });

  swiper.on("slideChange", function () {
    setActiveThumb(swiper.activeIndex);
  });

  setActiveThumb(0, false);
}());

