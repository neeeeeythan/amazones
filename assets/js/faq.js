// Get all FAQ containers
const containers = {
  初めての方へ: document.getElementById("初めての方へ"),
  施設について: document.getElementById("施設について"),
  ご入会について: document.getElementById("ご入会について"),
  ご予約について: document.getElementById("ご予約について"),
  料金プランについて: document.getElementById("料金プランについて"),
  お手続き休会退会復会について: document.getElementById("お手続き休会退会復会について"),
  お支払いについて: document.getElementById("お支払いについて"),
  採用について: document.getElementById("採用について"),
  その他:document.getElementById("その他")
};

// Store open IDs for each section
let openIds = {
  初めての方へ: [],
  施設について: [],
  ご入会について: [],
  ご予約について: [],
  料金プランについて: [],
  お手続き休会退会復会について: [],
  お支払いについて: [],
  採用について:[],
  その他:[]
};

// Track animation state per section
let animating = {
  初めての方へ: false,
  施設について: false,
  ご入会について: false,
  ご予約について: false,
  料金プランについて: false,
  お手続き休会退会復会について: false,
  お支払いについて:  false,
  採用について:  false,
  その他: false
};

function toggleAccordion(section, id) {
  if (animating[section]) return;

  const container = containers[section];
  if (!container) return;

  const header = container.querySelector(`[data-id="${id}"]`);
  if (!header) return;

  const faqElement = header.closest('.accordion_one');
  const inner = faqElement.querySelector('.accordion_inner');
  const arrow = faqElement.querySelector('.one_i');

  const wasOpen = openIds[section].includes(id);

  animating[section] = true;

  if (wasOpen) {
    openIds[section] = openIds[section].filter(v => v !== id);

    inner.classList.remove('opening');
    inner.classList.add('closing');
    header.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
      inner.classList.remove('closing', 'open');
      arrow.classList.remove('active');
      header.classList.remove('open');
      animating[section] = false;
    }, 400);
  } else {
    openIds[section].push(id);

    inner.classList.add('open');
    header.classList.add('open');
    arrow.classList.add('active');
    header.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(() => {
      inner.classList.remove('opening');
      void inner.offsetWidth;
      inner.classList.add('opening');

      setTimeout(() => {
        inner.classList.remove('opening');
        animating[section] = false;
      }, 400);
    });
  }
}

// Setup event listeners for all sections
Object.keys(containers).forEach(section => {
  const container = containers[section];

  container.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion_header');
    if (header) toggleAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener('keydown', (e) => {
    const header = e.target.closest('.accordion_header');
    if (header && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleAccordion(section, Number(header.dataset.id));
    }
  });
});
