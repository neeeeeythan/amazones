function init__tabs(selector = '[data-widget="tabs"]') {
  let tabs = document.querySelectorAll(selector);
  if (!tabs.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateFancyIndicator(tabsRoot, tab) {
    const width = tab.offsetWidth;
    const offset = tab.offsetLeft;
    tabsRoot.style.setProperty("--active-button-width", width + "px");
    tabsRoot.style.setProperty("--active-button-offset", offset + "px");
  }

  function cubicBezier(p1x, p1y, p2x, p2y) {
    return function (t) {
      let start = 0, end = 1;
      for (let i = 0; i < 20; i++) {
        const mid = (start + end) / 2;
        const mt = 1 - mid;
        const x = 3 * p1x * mt * mt * mid + 3 * p2x * mt * mid * mid + mid * mid * mid;
        if (x < t) start = mid;
        else end = mid;
      }
      const mid = (start + end) / 2;
      const mt = 1 - mid;
      return 3 * p1y * mt * mt * mid + 3 * p2y * mt * mid * mid + mid * mid * mid;
    };
  }
  const cssEaseOut = cubicBezier(0, 0, 0.58, 1);

  function scrollTabIntoView(container, button, duration) {
    if (!container || !button) return;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const containerCenter = containerRect.left + container.clientWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = Math.max(0, Math.min(container.scrollLeft + (buttonCenter - containerCenter), maxScroll));
    if (container._scrollRaf) cancelAnimationFrame(container._scrollRaf);
    if (duration) {
      const startScroll = container.scrollLeft;
      const distance = targetScroll - startScroll;
      const startTime = performance.now();
      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = cssEaseOut(progress);
        container.scrollLeft = startScroll + distance * eased;
        if (progress < 1) container._scrollRaf = requestAnimationFrame(step);
        else container._scrollRaf = null;
      }
      container._scrollRaf = requestAnimationFrame(step);
    } else {
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }

  function scrollToTarget(id, gap = 20) {
    let target = document.querySelector(id);
    if (!target) return;
    let offsetPosition = target.getBoundingClientRect().top + window.scrollY - gap;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  // PAGINATION FUNCTIONS
  function initPagination(tabsRoot, panel) {
    const itemsPerPage = parseInt(tabsRoot.dataset.itemsPerPage) || 10;
    
    // Get all panel-content elements
    const allItems = Array.from(panel.querySelectorAll('.panel-content'));
    
    // Get only items that are NOT filtered out
    const visibleItems = allItems.filter(item => item.dataset.filtered !== 'true');
    
    const paginationContainer = tabsRoot.querySelector('.pagination-container');
    if (!paginationContainer) return;

    // Check if there are any visible items
    if (visibleItems.length === 0) {
      paginationContainer.classList.add('hidden');
      
      // Show "No information found" message
      let noInfoMsg = panel.querySelector('.no-info-message');
      if (!noInfoMsg) {
        noInfoMsg = document.createElement('div');
        noInfoMsg.className = 'no-info-message w-full text-center py-10';
        noInfoMsg.innerHTML = '<p class="fs-16 fw-500 text-gray-400">情報が見つかりませんでした</p>';
        panel.appendChild(noInfoMsg);
      }
      
      // Hide all items
      allItems.forEach(item => {
        item.style.display = 'none';
      });
      return;
    } else {
      // Remove no info message if it exists
      const noInfoMsg = panel.querySelector('.no-info-message');
      if (noInfoMsg) noInfoMsg.remove();
    }

    // If items fit in one page, hide pagination and show all
    if (visibleItems.length <= itemsPerPage) {
      paginationContainer.classList.add('hidden');
      
      // Show all visible items
      allItems.forEach(item => {
        if (item.dataset.filtered === 'true') {
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }
      });
      return;
    }

    // Show pagination
    paginationContainer.classList.remove('hidden');

    // Calculate total pages
    const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
    let currentPage = parseInt(panel.dataset.currentPage) || 1;
    
    // Ensure current page is valid
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    panel.dataset.currentPage = currentPage;

    // Update pagination numbers and show items
    updatePaginationDisplay(tabsRoot, panel, visibleItems, totalPages, currentPage, itemsPerPage);
  }

  function updatePaginationDisplay(tabsRoot, panel, visibleItems, totalPages, currentPage, itemsPerPage) {
    // Update page numbers
    const numbersContainer = tabsRoot.querySelector('.pagination-numbers');
    if (numbersContainer) {
      numbersContainer.innerHTML = '';
      
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.setAttribute('data-page', i);
        
        pageBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const newPage = parseInt(e.target.getAttribute('data-page'));
          panel.dataset.currentPage = newPage;
          
          // Get fresh visible items
          const freshVisibleItems = Array.from(panel.querySelectorAll('.panel-content'))
            .filter(item => item.dataset.filtered !== 'true');
          const freshTotalPages = Math.ceil(freshVisibleItems.length / itemsPerPage);
          
          updatePaginationDisplay(tabsRoot, panel, freshVisibleItems, freshTotalPages, newPage, itemsPerPage);
          updatePaginationButtons(tabsRoot, panel, freshTotalPages, newPage);
        });
        
        numbersContainer.appendChild(pageBtn);
      }
    }

    // Update prev/next buttons
    updatePaginationButtons(tabsRoot, panel, totalPages, currentPage);

    // Show items for current page
    showPageItems(panel, visibleItems, itemsPerPage, currentPage);
  }

  function showPageItems(panel, visibleItems, itemsPerPage, currentPage) {
    // Get all items
    const allItems = Array.from(panel.querySelectorAll('.panel-content'));
    
    // First hide ALL items
    allItems.forEach(item => {
      item.style.display = 'none';
    });
    
    // Calculate start and end indices
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, visibleItems.length);
    
    // Show items for current page
    for (let i = startIdx; i < endIdx; i++) {
      if (visibleItems[i]) {
        visibleItems[i].style.display = 'flex';
      }
    }
  }

  function updatePaginationButtons(tabsRoot, panel, totalPages, currentPage) {
    const prevBtn = tabsRoot.querySelector('.pagination-prev');
    const nextBtn = tabsRoot.querySelector('.pagination-next');
    
    if (prevBtn) {
      prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = currentPage === totalPages;
    }
  }


  // FIXED YEAR FILTER
  // ✅ FIX: Use '.button-filter-wrapper button' instead of '.news-section > div button'
  // The old selector also matched .tabs-control buttons, causing the active-year
  // class to be stripped whenever a tab was clicked.
  function initYearFilters(tabsWidget) {
    const yearButtons = document.querySelectorAll('.button-filter-wrapper button');
    
    if (!yearButtons.length || !tabsWidget) return;
    
    // Initialize all items with filter data attribute
    const allPanels = tabsWidget.querySelectorAll('.tabs-panel');
    allPanels.forEach(panel => {
      const items = panel.querySelectorAll('.panel-content');
      items.forEach(item => {
        item.dataset.filtered = 'false';
      });
    });
    
    // Store original state for reset
    const originalFilterState = {};
    allPanels.forEach(panel => {
      originalFilterState[panel.id] = 'false';
    });
    
    yearButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get year from button text (remove '年' character)
        let yearText = button.textContent.trim().replace('年', '');
        
        // Update active state for year buttons only
        yearButtons.forEach(btn => btn.classList.remove('active-year'));
        button.classList.add('active-year');
        
        // Filter items in all panels
        allPanels.forEach(panel => {
          const items = panel.querySelectorAll('.panel-content');
          let hasVisibleItems = false;
          
          items.forEach(item => {
            // Get the date from the item
            const dateElement = item.querySelector('.text-lightBlue');
            
            if (dateElement) {
              const dateText = dateElement.textContent.trim();
              const itemYear = dateText.split('.')[0]; // Get year from "2026.00.00"
              
              // Compare with selected year
              if (itemYear === yearText) {
                item.dataset.filtered = 'false';
                hasVisibleItems = true;
              } else {
                item.dataset.filtered = 'true';
              }
            } else {
              item.dataset.filtered = 'true';
            }
          });
          
          // Remove any existing no-info message
          const noInfoMsg = panel.querySelector('.no-info-message');
          if (noInfoMsg) noInfoMsg.remove();
          
          // If no items match this year, show message
          if (!hasVisibleItems) {
            let noInfoMsg = panel.querySelector('.no-info-message');
            if (!noInfoMsg) {
              noInfoMsg = document.createElement('div');
              noInfoMsg.className = 'no-info-message w-full text-center py-10';
              noInfoMsg.innerHTML = '<p class="fs-16 fw-500 text-gray-400">情報が見つかりませんでした ' + '</p>';
              panel.appendChild(noInfoMsg);
            }
          }
        });
        
        // Reset to page 1 for active panel
        const activePanel = tabsWidget.querySelector('.tabs-panel[aria-selected="true"]');
        if (activePanel) {
          activePanel.dataset.currentPage = "1";
          initPagination(tabsWidget, activePanel);
        }
      });
    });
    
    // Add a reset function (click the first button by default)
    // This ensures all items are visible initially
    setTimeout(() => {
      if (yearButtons.length > 0) {
        // Trigger click on first button to initialize filter
        yearButtons[0].classList.add('active-year');
      }
    }, 100);
  }

  tabs.forEach((item) => {
    let tabs_controlers = item.querySelectorAll(".tabs-control");
    let tabs_scrollTop = item.dataset.scrollTop === "true";
    let tabs_autoplay = item.dataset.tabsAutoplay === "true";
    let tab_index = 0;

    // Find the index of the initially selected tab
    tabs_controlers.forEach((tab, idx) => {
      if (tab.getAttribute("aria-selected") === "true") {
        tab_index = idx;
      }
    });

    let tabs_imageSlider;
    let tabs_withImages = item.dataset.type === "tabs-with-images";
    if (tabs_withImages) {
      tabs_imageSlider = item.closest('[data-component="tabs"]')?.querySelector('[data-widget="swiper"] .swiper');
    }

    let tabsControlsWrap = item.querySelector(".tabs-controls");
    let isFancy = tabsControlsWrap?.getAttribute("data-type") === "fancy";
    let hasTrack = item.hasAttribute("data-tabs-track") && item.getAttribute("data-tabs-track") !== "false";
    let animValue = item.getAttribute("data-tabs-animate");
    let hasAnimation = animValue !== null && animValue !== "false";
    let animDuration = 500;
    let animOffset = 100;
    if (hasAnimation && animValue !== "" && animValue !== "true") {
      const parts = animValue.split(",");
      const d = parseInt(parts[0]?.trim());
      const o = parseInt(parts[1]?.trim());
      if (!isNaN(d) && !isNaN(o)) {
        animDuration = d;
        animOffset = o;
      }
    }

    if (isFancy && tabs_controlers.length) {
      updateFancyIndicator(item, tabs_controlers[tab_index]);
    }

    // Initialize all items
    const allPanels = item.querySelectorAll('.tabs-panel');
    allPanels.forEach(panel => {
      const panelContents = panel.querySelectorAll('.panel-content');
      panelContents.forEach(content => {
        content.style.display = 'flex';
        content.dataset.filtered = 'false';
      });
    });

    // Initialize pagination for active panel
    const activePanel = item.querySelector('.tabs-panel[aria-selected="true"]');
    if (activePanel) {
      allPanels.forEach(panel => {
        if (panel !== activePanel) {
          panel.setAttribute("aria-selected", "false");
        }
      });
      
      setTimeout(() => {
        initPagination(item, activePanel);
      }, 100);
    }

    // Add pagination event listeners for prev/next buttons
    const prevBtn = item.querySelector('.pagination-prev');
    const nextBtn = item.querySelector('.pagination-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const activePanel = item.querySelector('.tabs-panel[aria-selected="true"]');
        if (!activePanel) return;
        
        const currentPage = parseInt(activePanel.dataset.currentPage) || 1;
        if (currentPage > 1) {
          activePanel.dataset.currentPage = currentPage - 1;
          initPagination(item, activePanel);
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const activePanel = item.querySelector('.tabs-panel[aria-selected="true"]');
        if (!activePanel) return;
        
        const itemsPerPage = parseInt(item.dataset.itemsPerPage) || 10;
        const visibleItems = Array.from(activePanel.querySelectorAll('.panel-content'))
          .filter(item => item.dataset.filtered !== 'true');
        const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
        
        const currentPage = parseInt(activePanel.dataset.currentPage) || 1;
        if (currentPage < totalPages) {
          activePanel.dataset.currentPage = currentPage + 1;
          initPagination(item, activePanel);
        }
      });
    }

    tabs_controlers.forEach((tab, idx) => {
      tab.addEventListener("click", (e) => {
        let dft_tab = e.currentTarget;
        let dft_tab__aria_controls = dft_tab.getAttribute("aria-controls");
        let prevIndex = tab_index;
        tab_index = idx;

        let tab_prev_active = item.querySelector('.tabs-control[aria-selected="true"]');
        if (tab_prev_active) tab_prev_active.setAttribute("aria-selected", "false");

        dft_tab.setAttribute("aria-selected", "true");

        if (isFancy) {
          updateFancyIndicator(item, dft_tab);
        }

        if (hasTrack) {
          scrollTabIntoView(tabsControlsWrap, dft_tab, hasAnimation && !reduceMotion ? animDuration : null);
        }

        let panel_prev_active = item.querySelector('.tabs-panel[aria-selected="true"]');
        if (panel_prev_active) {
          panel_prev_active.setAttribute("aria-selected", "false");
        }

        let dft_panel = item.querySelector(`#${dft_tab__aria_controls}`);
        if (dft_panel) {
          dft_panel.setAttribute("aria-selected", "true");
          
          // Reset to page 1 when switching tabs
          dft_panel.dataset.currentPage = "1";
          
          // Initialize pagination for the new active panel
          setTimeout(() => {
            initPagination(item, dft_panel);
          }, 50);
        }

        if (hasAnimation && !reduceMotion && dft_panel && prevIndex !== idx) {
          const direction = idx > prevIndex ? 1 : -1;
          dft_panel.animate(
            [
              { opacity: 0, transform: `translateX(${animOffset * direction}px)` },
              { opacity: 1, transform: "translateX(0)" }
            ],
            { duration: animDuration, easing: "ease-out" }
          );
        }

        if (tabs_scrollTop) {
          let tabs_controls_height = item.querySelector(".tabs-controls").offsetHeight;
          let offset = tabs_controls_height + 40;
          scrollToTarget(`#${dft_tab__aria_controls}`, offset);
        }
      });
    });

    if (tabs_autoplay) {
      let speed = item.dataset.autoplaySpeed ? item.dataset.autoplaySpeed : 5000;
      let paused = false;
      let timer;

      ["mouseenter", "focus"].forEach(evt => item.addEventListener(evt, () => (paused = true)));
      ["mouseleave", "blur"].forEach(evt => item.addEventListener(evt, () => (paused = false)));

      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timer = setInterval(() => {
              if (!paused) {
                tab_index++;
                if (tab_index === tabs_controlers.length) tab_index = 0;
                tabs_controlers[tab_index].click();
              }
            }, speed);
          } else {
            clearInterval(timer);
          }
        });
      });
      observer.observe(item);
    }

    if (isFancy) {
      window.addEventListener("resize", () => {
        let activeTab = item.querySelector('.tabs-control[aria-selected="true"]');
        if (activeTab) updateFancyIndicator(item, activeTab);
      });
    }
  });

  // Initialize year filters
  const tabsWidget = document.querySelector('[data-widget="tabs"]');
  if (tabsWidget) {
    initYearFilters(tabsWidget);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init__tabs();
});