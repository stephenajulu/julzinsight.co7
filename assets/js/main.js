/**
 * Julz Insight — Enterprise Web Presence
 * Core JavaScript Engine
 * Fully Sovereign, Zero Dependencies, High Performance
 */

(function () {
  'use strict';

  // Site Data injected or parsed
  const siteData = window.__JULZ_DATA__ || {};
  const tiers = siteData.architectureTiers || [];

  // Global Application State
  const state = {
    theme: 'dark',
    currency: 'KES',
    activeRole: 'ceo',
    selectedTierId: 3,
    modalTierId: 3,
    hostingFilter: 'All',
    teamSize: 65,
    selectedTools: ['workspace', 'crm_slack', 'security_vault', 'automation'],
    isModalOpen: false,
    isDrawerOpen: false,
  };

  let lastFocusedElement = null;

  const toolDefinitions = [
    { id: 'workspace', name: 'Google Workspace / M365', costPerUserUsd: 18, costPerUserKes: 2340 },
    { id: 'crm_slack', name: 'Salesforce + Slack + Jira', costPerUserUsd: 85, costPerUserKes: 11050 },
    { id: 'security_vault', name: 'Okta SSO + 1Password', costPerUserUsd: 14, costPerUserKes: 1820 },
    { id: 'automation', name: 'Zapier Ent + DocuSign', costPerUserUsd: 22, costPerUserKes: 2860 },
    { id: 'devops_cloud', name: 'Datadog + AWS S3 / EKS Sprawl', costPerUserUsd: 45, costPerUserKes: 5850 },
  ];

  function formatNumber(num) {
    return new Intl.NumberFormat().format(Math.round(num));
  }

  /* ==========================================================================
     THEME CONTROLLER (LIGHT / DARK)
     ========================================================================== */
  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

    // Update theme-color meta tag for mobile browser headers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#040406');
    }

    // Update button states in mobile drawer
    document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
      const t = btn.getAttribute('data-theme-btn');
      if (t === theme) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Update aria labels on desktop & mobile switcher buttons
    const desktopBtn = document.getElementById('theme-toggle-btn');
    if (desktopBtn) {
      desktopBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      desktopBtn.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }

    const mobileBtn = document.getElementById('mobile-theme-btn');
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      mobileBtn.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function toggleTheme() {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  }

  window.setTheme = setTheme;
  window.toggleTheme = toggleTheme;

  function initTheme() {
    const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    setTheme(initialTheme);

    const desktopBtn = document.getElementById('theme-toggle-btn');
    if (desktopBtn) {
      desktopBtn.addEventListener('click', toggleTheme);
    }

    const mobileBtn = document.getElementById('mobile-theme-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', toggleTheme);
    }

    // Listen for OS scheme changes if user hasn't set an explicit manual override
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'light' : 'dark');
          }
        } catch (err) {}
      });
    }
  }

  /* ==========================================================================
     CURRENCY SWITCHER
     ========================================================================== */
  function setCurrency(curr) {
    if (curr !== 'KES' && curr !== 'USD') return;
    state.currency = curr;

    // 1. Update active states on currency buttons
    document.querySelectorAll('[data-currency-btn]').forEach((btn) => {
      const targetCurr = btn.getAttribute('data-currency-btn');
      if (targetCurr === curr) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    const mobileCurrBtn = document.getElementById('mobile-curr-btn');
    if (mobileCurrBtn) {
      mobileCurrBtn.textContent = curr;
    }

    // 2. Update Hero Telemetry Amount
    const heroAmount = document.getElementById('hero-telemetry-amount');
    if (heroAmount) {
      heroAmount.textContent = curr === 'KES' ? 'KES 1,120,000' : '$8,600';
    }

    // 3. Update InsightOS CEO KPI
    const ceoSavingsKpi = document.getElementById('ceo-savings-kpi');
    if (ceoSavingsKpi) {
      ceoSavingsKpi.textContent = curr === 'KES' ? 'KES 12,400,000' : '$96,000';
    }

    // 4. Update Tier Explorer prices
    updateTierExplorerCurrency();

    // 5. Update ROI Calculator
    updateRoiCalculator();

    // 6. Update Modal Tier Price estimate
    updateModalEstimate();
  }

  window.setCurrency = setCurrency;

  /* ==========================================================================
     NAVBAR & SCROLL
     ========================================================================== */
  function initNavbar() {
    const header = document.getElementById('site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Mobile drawer toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');

    function openDrawer() {
      state.isDrawerOpen = true;
      if (mobileDrawer) {
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
      }
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('modal-open');
    }

    function closeDrawer() {
      state.isDrawerOpen = false;
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
      if (!state.isModalOpen) {
        document.body.classList.remove('modal-open');
      }
    }

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', () => {
        if (state.isDrawerOpen) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Close drawer on link click
    document.querySelectorAll('.drawer-nav a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // Mobile curr toggle
    const mobileCurrBtn = document.getElementById('mobile-curr-btn');
    if (mobileCurrBtn) {
      mobileCurrBtn.addEventListener('click', () => {
        setCurrency(state.currency === 'KES' ? 'USD' : 'KES');
      });
    }
  }

  /* ==========================================================================
     INSIGHTOS SHOWCASE TABS
     ========================================================================== */
  function setInsightOsRole(role) {
    state.activeRole = role;

    // Update tab button styles and ARIA states
    document.querySelectorAll('.role-btn').forEach((btn) => {
      const isRole = btn.getAttribute('data-role') === role;
      if (isRole) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update role view containers
    document.querySelectorAll('.os-role-view').forEach((view) => {
      if (view.getAttribute('data-view') === role) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    });
  }

  function initInsightOs() {
    document.querySelectorAll('.role-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        if (role) setInsightOsRole(role);
      });
    });
  }

  /* ==========================================================================
     TIER EXPLORER
     ========================================================================== */
  function getTierById(id) {
    return tiers.find((t) => t.id === Number(id)) || tiers[2];
  }

  function selectTier(tierId) {
    state.selectedTierId = Number(tierId);
    const tier = getTierById(tierId);

    // Update tab buttons
    document.querySelectorAll('.tier-tab-btn').forEach((btn) => {
      const bId = Number(btn.getAttribute('data-tier-id'));
      const pingDot = btn.querySelector('.tab-ping-dot');
      const isSelected = bId === state.selectedTierId;
      if (isSelected) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        if (pingDot) pingDot.classList.remove('hidden');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        if (pingDot) pingDot.classList.add('hidden');
      }
    });

    // Update Deep Dive Content
    const pill = document.getElementById('tier-featured-pill');
    if (pill) pill.textContent = tier.featuredPill;

    const title = document.getElementById('tier-title');
    if (title) title.textContent = tier.name;

    const tagline = document.getElementById('tier-tagline');
    if (tagline) tagline.textContent = tier.tagline;

    const audience = document.getElementById('tier-audience');
    if (audience) audience.textContent = tier.targetAudience;

    const purpose = document.getElementById('tier-purpose');
    if (purpose) purpose.textContent = tier.purpose;

    const readiness = document.getElementById('tier-agent-readiness');
    if (readiness) readiness.textContent = tier.agentReadiness;

    const readinessLabel = document.getElementById('tier-readiness-label');
    if (readinessLabel) {
      readinessLabel.textContent = tier.id === 5 
        ? 'Private Sovereign AI Readiness' 
        : 'System Integration & Automation Readiness';
    }

    const replaces = document.getElementById('tier-replaces-text');
    if (replaces) replaces.textContent = tier.replacesText;

    // Update CTA button inside financial box
    const reqBtn = document.getElementById('btn-request-blueprint');
    if (reqBtn) {
      reqBtn.setAttribute('data-tier-id', tier.id);
      const span = reqBtn.querySelector('span');
      if (span) {
        if (state.selectedTierId === 4) {
          span.textContent = 'Apply for Tier 04 Beta Access';
        } else if (state.selectedTierId === 5) {
          span.textContent = 'Join Closed Architecture Waitlist (Tier 05)';
        } else {
          span.textContent = `Request Tier 0${tier.id} Architecture Blueprint`;
        }
      }
    }

    // Update Status Banner for Beta / Coming Soon
    const statusBanner = document.getElementById('tier-status-banner');
    if (statusBanner) {
      if (state.selectedTierId === 4) {
        statusBanner.className = 'tier-status-banner banner-beta';
        statusBanner.innerHTML = `
          <svg width="18" height="18" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <strong>Beta Testers Only:</strong> Tier 04 is currently in active early-access fine-tuning. Deployments are limited to selected enterprise test partners.
          </div>
        `;
      } else if (state.selectedTierId === 5) {
        statusBanner.className = 'tier-status-banner banner-coming-soon';
        statusBanner.innerHTML = `
          <svg width="18" height="18" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <div>
            <strong>Coming Soon:</strong> Tier 05 is in advanced research and development behind closed doors. Rollout opens soon for waitlist partners.
          </div>
        `;
      } else {
        statusBanner.className = 'tier-status-banner hidden';
        statusBanner.innerHTML = '';
      }
    }

    // Update Pain Points Grid
    const painGrid = document.getElementById('tier-pain-points-grid');
    if (painGrid && tier.painPointsSolved) {
      painGrid.innerHTML = tier.painPointsSolved
        .map(
          (p) => `
          <div style="padding: 1rem; border-radius: 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.375rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span style="font-size: 14px; font-weight: 600; color: #ffffff;">${p.title}</span>
            </div>
            <p style="font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.625;">${p.description}</p>
          </div>
        `
        )
        .join('');
    }

    // Update Components List
    const compCount = document.getElementById('tier-components-count');
    if (compCount) compCount.textContent = tier.components.length;

    const compList = document.getElementById('tier-components-list');
    if (compList && tier.components) {
      compList.innerHTML = tier.components
        .map(
          (c) => `
          <div style="padding: 0.75rem; border-radius: 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 14px; font-weight: 600; color: #ffffff;">${c.name}</span>
                <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; padding: 0.125rem 0.5rem; border-radius: 4px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6);">${c.role}</span>
              </div>
              <p style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 0.25rem;">${c.description}</p>
            </div>
            <span style="padding: 0.125rem 0.5rem; border-radius: 4px; font-size: 10px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; font-weight: 700; color: #00f2fe; background: rgba(0, 242, 254, 0.1); flex-shrink: 0;">${c.status}</span>
          </div>
        `
        )
        .join('');
    }

    updateTierExplorerCurrency();
  }

  function updateTierExplorerCurrency() {
    const isKes = state.currency === 'KES';

    // Tab price previews
    tiers.forEach((t) => {
      const previewEl = document.getElementById(`tier-tab-price-${t.id}`);
      if (previewEl) {
        previewEl.textContent = isKes ? t.monthlyKes : t.monthlyUsd;
      }
    });

    // Deep dive active tier
    const activeTier = getTierById(state.selectedTierId);
    const monthlyEl = document.getElementById('tier-monthly-price');
    if (monthlyEl) {
      monthlyEl.textContent = isKes ? activeTier.monthlyKes : activeTier.monthlyUsd;
    }

    const setupEl = document.getElementById('tier-setup-price');
    if (setupEl) {
      setupEl.textContent = isKes ? activeTier.setupFeeKes : activeTier.setupFeeUsd;
    }
  }

  function initTierExplorer() {
    document.querySelectorAll('.tier-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tier-id');
        if (id) selectTier(id);
      });
    });

    const reqBtn = document.getElementById('btn-request-blueprint');
    if (reqBtn) {
      reqBtn.addEventListener('click', () => {
        const id = reqBtn.getAttribute('data-tier-id') || state.selectedTierId;
        openModal(Number(id));
      });
    }

    // Initialize with Tier 3
    selectTier(3);
  }

  /* ==========================================================================
     ROI CALCULATOR
     ========================================================================== */
  function toggleRoiTool(toolId) {
    if (state.selectedTools.includes(toolId)) {
      if (state.selectedTools.length > 1) {
        state.selectedTools = state.selectedTools.filter((t) => t !== toolId);
      }
    } else {
      state.selectedTools.push(toolId);
    }
    updateRoiCalculator();
  }

  function updateRoiCalculator() {
    const isKes = state.currency === 'KES';

    // Update Team Size Badge
    const sizeBadge = document.getElementById('roi-team-size-badge');
    if (sizeBadge) {
      sizeBadge.textContent = `${state.teamSize} Users`;
    }

    // Update tool button styles and price subtexts
    toolDefinitions.forEach((tool) => {
      const btn = document.getElementById(`roi-tool-${tool.id}`);
      if (btn) {
        const isChecked = state.selectedTools.includes(tool.id);
        if (isChecked) {
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        }
        const costSpan = btn.querySelector('.tool-cost');
        if (costSpan) {
          costSpan.textContent = isKes
            ? `~KES ${formatNumber(tool.costPerUserKes)}/u`
            : `~$${tool.costPerUserUsd}/u`;
        }
      }
    });

    // Math Calculations
    const proprietaryMonthlyUsd = state.selectedTools.reduce((acc, toolId) => {
      const tool = toolDefinitions.find((t) => t.id === toolId);
      return acc + (tool ? tool.costPerUserUsd * state.teamSize : 0);
    }, 0);

    const proprietaryMonthlyKes = proprietaryMonthlyUsd * 130;

    const julzMonthlyUsd =
      state.teamSize <= 25 ? 400 : state.teamSize <= 100 ? 1200 : state.teamSize <= 250 ? 2500 : 4500;
    const julzMonthlyKes = julzMonthlyUsd * 130;

    const monthlySavingsUsd = Math.max(0, proprietaryMonthlyUsd - julzMonthlyUsd);
    const monthlySavingsKes = monthlySavingsUsd * 130;

    const savingsPct =
      proprietaryMonthlyUsd > 0 ? Math.round((monthlySavingsUsd / proprietaryMonthlyUsd) * 100) : 0;
    const annualSavingsUsd = monthlySavingsUsd * 12;
    const annualSavingsKes = monthlySavingsKes * 12;

    // Update UI elements
    const savingsPctBadge = document.getElementById('roi-savings-pct');
    if (savingsPctBadge) {
      savingsPctBadge.textContent = `${savingsPct}% Savings`;
    }

    const annualSavingsEl = document.getElementById('roi-annual-savings');
    if (annualSavingsEl) {
      annualSavingsEl.textContent = isKes
        ? `KES ${formatNumber(annualSavingsKes)}`
        : `$${formatNumber(annualSavingsUsd)}`;
    }

    const propSpendEl = document.getElementById('roi-proprietary-monthly');
    if (propSpendEl) {
      propSpendEl.textContent = isKes
        ? `KES ${formatNumber(proprietaryMonthlyKes)}/mo`
        : `$${formatNumber(proprietaryMonthlyUsd)}/mo`;
    }

    const julzSpendEl = document.getElementById('roi-julz-monthly');
    if (julzSpendEl) {
      julzSpendEl.textContent = isKes
        ? `KES ${formatNumber(julzMonthlyKes)}/mo`
        : `$${formatNumber(julzMonthlyUsd)}/mo`;
    }
  }

  function initRoiCalculator() {
    const slider = document.getElementById('roi-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        state.teamSize = Number(e.target.value);
        updateRoiCalculator();
      });
    }

    document.querySelectorAll('.sprawl-grid .tool-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tool-id');
        if (id) toggleRoiTool(id);
      });
    });

    const ctaBtn = document.getElementById('btn-roi-lock');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        openModal();
      });
    }

    updateRoiCalculator();
  }

  /* ==========================================================================
     HOSTING MATRIX FILTER
     ========================================================================== */
  function setHostingFilter(category) {
    state.hostingFilter = category;

    // Update filter pills
    document.querySelectorAll('.matrix-filters .filter-btn').forEach((btn) => {
      const isCat = btn.getAttribute('data-category') === category;
      if (isCat) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Show/hide cards
    document.querySelectorAll('.providers-grid .provider-card').forEach((card) => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'All' || cardCat === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  function initHostingMatrix() {
    document.querySelectorAll('.matrix-filters .filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        if (cat) setHostingFilter(cat);
      });
    });
  }

  /* ==========================================================================
     FAQ ACCORDION
     ========================================================================== */
  function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const btn = item.querySelector('.faq-question-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');

          // Close other items
          document.querySelectorAll('.faq-item').forEach((other) => {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          });

          // Toggle clicked item
          if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
          } else {
            btn.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  /* ==========================================================================
     CONSULTATION MODAL
     ========================================================================== */
  function updateModalEstimate() {
    const tier = getTierById(state.modalTierId);
    const estEl = document.getElementById('modal-tier-price-estimate');
    if (estEl) {
      const price = state.currency === 'KES' ? tier.monthlyKes : tier.monthlyUsd;
      estEl.textContent = `Estimated: ${price} (Software Retainer & Managed Support)`;
    }
  }

  function setModalTier(tierId) {
    state.modalTierId = Number(tierId);

    document.querySelectorAll('.tier-choice-btn').forEach((btn) => {
      const id = Number(btn.getAttribute('data-tier-id'));
      const isMatch = id === state.modalTierId;
      if (isMatch) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    updateModalEstimate();
  }

  function openModal(tierId) {
    lastFocusedElement = document.activeElement;

    if (tierId) {
      setModalTier(tierId);
    } else {
      setModalTier(state.selectedTierId || 3);
    }

    // Reset confirmation view to form
    const formView = document.getElementById('modal-form-view');
    const confirmView = document.getElementById('modal-confirmation-view');
    if (formView) formView.classList.remove('hidden');
    if (confirmView) confirmView.classList.add('hidden');

    const modal = document.getElementById('consultation-modal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      state.isModalOpen = true;
      document.body.classList.add('modal-open');
      const firstInput = modal.querySelector('input:not([type="hidden"]), button:not([disabled])');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 50);
      }
    }
  }

  function closeModal() {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      state.isModalOpen = false;
      if (!state.isDrawerOpen) {
        document.body.classList.remove('modal-open');
      }
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  function initModal() {
    // Open triggers
    document.querySelectorAll('[data-modal-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tId = btn.getAttribute('data-tier-id');
        openModal(tId ? Number(tId) : undefined);
      });
    });

    // Close triggers
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);

    const returnBtn = document.getElementById('modal-return-btn');
    if (returnBtn) returnBtn.addEventListener('click', closeModal);

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isModalOpen) {
        closeModal();
      }
    });

    // Modal focus trap
    const modalEl = document.getElementById('consultation-modal');
    if (modalEl) {
      modalEl.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !state.isModalOpen) return;
        const focusable = modalEl.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    // Tier choice buttons inside modal
    document.querySelectorAll('.tier-choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tier-id');
        if (id) setModalTier(id);
      });
    });

    // Form submission
    const form = document.getElementById('consultation-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('modal-input-name');
        const emailInput = document.getElementById('modal-input-email');
        const companyInput = document.getElementById('modal-input-company');
        const hostSelect = document.getElementById('modal-select-hosting');

        const userName = nameInput ? nameInput.value : 'Executive';
        const userEmail = emailInput ? emailInput.value : 'executive@enterprise.co.ke';
        const userCompany = companyInput ? companyInput.value : 'Enterprise';
        const userHost = hostSelect ? hostSelect.value : 'Safaricom Enterprise Cloud';

        const tierObj = getTierById(state.modalTierId);

        // Populate confirmation view
        const spanName = document.getElementById('confirm-name');
        if (spanName) spanName.textContent = userName;

        const spanCompany = document.getElementById('confirm-company');
        if (spanCompany) spanCompany.textContent = userCompany;

        const spanEmail = document.getElementById('confirm-email');
        if (spanEmail) spanEmail.textContent = userEmail;

        const spanTier = document.getElementById('confirm-tier');
        if (spanTier) spanTier.textContent = `Tier 0${tierObj.id} (${tierObj.name})`;

        const spanFabric = document.getElementById('confirm-fabric');
        if (spanFabric) spanFabric.textContent = userHost;

        // Switch views
        const formView = document.getElementById('modal-form-view');
        const confirmView = document.getElementById('modal-confirmation-view');
        if (formView) formView.classList.add('hidden');
        if (confirmView) confirmView.classList.remove('hidden');
      });
    }
  }

  /* ==========================================================================
     INIT ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initInsightOs();
    initTierExplorer();
    initRoiCalculator();
    initHostingMatrix();
    initFaqAccordion();
    initModal();
  });
})();
