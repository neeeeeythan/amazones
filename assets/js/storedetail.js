const reviews = [
    { name: "青木舞", date: "Jan 27, 2026", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKKpCakRsfxmmXdNSJqOQMepkJBKZP3aCJXIyjiPbJirxhujw=s56-c0x00000000-cc-rp-mo", text: "I joined because I wanted to get in shape before entering the workforce! The trainer explained things clearly from the first day, which was great! I hope to get in shape even just a little." },
    { name: "武藤優季", date: "Jan 8, 2026", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXhLeQ9pq39wQaFEswOTIEJ2uyeIP-7IPjX5wDRXwgQ-AimE00=s56-c0x00000000-cc-rp-mo", text: "I was interested when I found out there was one near my house. They taught me everything carefully, step by step, which really motivated me. I'd like to keep going for a year and try my best to lose weight." },
    { name: "Koma", date: "Jan 6, 2026", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWjl6x1QoB9o8xMgRuoFHGaTrGRMuJiZcI15FONUe2wCWuma7g=s56-c0x00000000-cc-rp-mo", text: "I had no training experience and everything was new to me, but the staff were polite, kind, and taught me with a smile, so I had a fun experience. I hope to learn quickly and continue for a long time." },
    { name: "恩田麻里子", date: "Dec 8, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocJdKuc_YMe8DNaBM7jQS0zy0PzrrD7m0rmJhh_TQv-C5SEzhA=s56-c0x00000000-cc-rp-mo", text: "I came to the store because I've been gaining weight. I was given one-on-one instruction and my posture was also checked, which was easy to understand and helpful. I'll continue to come here until I reach my goal." },
    { name: "ゆみ", date: "Dec 6, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocJLGos06iIwbVnk0cSZhSWGiFc_b73o6rodJYTpUYiUcOF4-g=s56-c0x00000000-cc-rp-mo", text: "By training under his guidance, I learned the correct way to train! It made me realize that if I'm going to take the time to train, I want to use my muscles correctly." },
    { name: "大川裕嘉", date: "Nov 25, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocL5q1EtlMe_Fuyxe7hMcrMkHH6mwd1Yp0W1eM1GrWiTYpEfVA=s56-c0x00000000-cc-rp-mo", text: "I came here because I wanted to try a personal gym. I was treated with kindness and was given detailed instructions, which was great! I'll do my best to achieve my ideal body shape." },
    { name: "マエダ", date: "Nov 10, 2025", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXWglyvpNZRwDkUesdZn-jQjSsQX-DRuhxYtZL1GqSD2W_afbmh=s56-c0x00000000-cc-rp-mo", text: "I was attracted to this gym because it was a 24-hour women-only gym. During the trial session, the staff taught me carefully and kindly, and I decided I wanted to join." },
    { name: "麻美", date: "Nov 6, 2025", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUbXzDFIG991YQaoFtak8Rf4ZAs1hGlRxgIzI2yGDKbZUYbENIP=s56-c0x00000000-cc-rp-mo", text: "I found out about it through an ad on Instagram and came to try it out. The instructions were very thorough and the facility was nice and clean. I'll do my best to reach my goal weight by spring!" },
    { name: "mari 2424", date: "Oct 31, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ1hhUvlZ3dF_vpdk4PJBEtBrjN-3xqQdS0oJ36uUm0pL5JQg=s56-c0x00000000-cc-rp-mo", text: "I went for a trial session. They carefully taught me the correct form and my legs were so limp. I'll keep coming back and work hard to reach my goal." },
    { name: "鷲見舞乃", date: "Oct 11, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKHNt3yOyR1oqO93C7M_8mMtpaTke_fUx450tk8jziSnyI6lQ=s56-c0x00000000-cc-rp-mo", text: "I had the opportunity to try it out. The explanation was thorough and easy to understand. I actually got a good understanding of how to use my body! I'm looking forward to attending classes in the future." },
    { name: "ゆゆ", date: "Oct 10, 2025", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjU2UyXKLNJQkXWudu88UG_9HhW5k1k2ucKnH9JAHvJu725fIpFr=s56-c0x00000000-cc-rp-mo", text: "I found it after a Google search. During the trial session, I was tired because it had been a while since I last exercised, but they taught me kindly so I was able to do my best!" },
    { name: "2525 coto", date: "Oct 9, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocK8gtouqsbjrSRq6EoCzKiF_x3mE-1ZQvtc7RpuhLzAuUIpwg=s56-c0x00000000-cc-rp-mo", text: "A friend invited me to go and try it out! The staff were very helpful and taught me how to train parts of my body that I don't usually get to train. I'm definitely going to keep coming back!" },
    { name: "m", date: "Sep 5, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocL-MY4QKhxoc1XWbKT-2qiUUSBEbPxsJbLjYes4MVGVv0w51g=s56-c0x00000000-cc-rp-mo", text: "I tried out the gym, and it was fun because they were very polite and easy to talk to. There was no pushy sales pitch, it's a women-only gym, and the atmosphere was great, so I decided to sign up!" },
    { name: "Mao", date: "Jul 29, 2025", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXWhx0ClivGh0K7x9CfJI7DCosM110QGWvs7OJlSLTwFDQCC7LC=s56-c0x00000000-cc-rp-mo", text: "I came here because a new gym opened near my house. The instructors were kind and thorough, and I had a great time training. I'd like to continue going there and keep building a healthy body." },
    { name: "さき", date: "Jul 11, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKJ2gliXCAzKQNeuuhvmT98Of928jNMJzSOOOPBrE8ih0LujA=s56-c0x00000000-cc-rp-mo", text: "I had no training experience at all, but the trainer was kind and taught me carefully, so I think I can keep it up. I'm going to do my best to lose weight in a healthy way." },
    { name: "bun bun", date: "May 2, 2025", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIr-1BD9nVazOzdN2Sw0rKvU9MHN-eRm0eD32JjDNztBN2Exw=s56-c0x00000000-cc-rp-mo", text: "I stopped exercising due to childbirth and childcare, and my body felt heavy. He taught me carefully and for the first time in a long time, I was able to enjoy the sore muscles and feel refreshed!" },
  ];

  const VISIBLE = 3;
  let current = 0;
  const track = document.getElementById('track');
  const dotsEl = document.getElementById('dots');

  const googleSVG = `<svg class="g-icon" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;

  reviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="reviewer-row">
        <div class="avatar"><img src="${r.avatar}" alt="${r.name}" loading="lazy"></div>
        <div class="reviewer-info">
          <div class="reviewer-name">${r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
        ${googleSVG}
      </div>
      <div class="card-stars">★★★★★</div>
      <div class="review-text">${r.text}</div>
    `;
    track.appendChild(card);
  });

  const totalPages = reviews.length - VISIBLE + 1;
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dotsEl.appendChild(dot);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, totalPages - 1));
    const cardWidth = track.children[0].offsetWidth + 16;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    document.getElementById('prevBtn').disabled = current === 0;
    document.getElementById('nextBtn').disabled = current === totalPages - 1;
  }

  function move(dir) { goTo(current + dir); }
  goTo(0);
  window.addEventListener('resize', () => goTo(current));

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
        icon: "../assets/img/faq/icon_faq_label2.svg", // adjust icon path as needed
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
