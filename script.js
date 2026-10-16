/**
 * ===================================================================
 * PARK & GO — Marketing Website Interactive Script & Configuration
 * ===================================================================
 * 
 * QUICK EDIT GUIDE:
 * You can easily update your contact information, social links, and
 * team info directly in the CONFIG object below. All changes will
 * automatically reflect across the website!
 */

const CONFIG = {
  companyName: "Park & Go",
  tagline: "Smart Parking Infrastructure. Zero Congestion. Maximum Revenue.",
  
  // Contact Information (Easily editable for meetings & pitches)
  contact: {
    email: "partners@parkandgo.io",
    salesEmail: "sales@parkandgo.io",
    phone: "+20 100 234 5678",
    whatsapp: "+20 100 234 5678",
    address: "Alexandria & Cairo, Egypt • Regional Operations",
    hours: "Sun – Thu: 9:00 AM – 6:00 PM (EET)"
  },

  // Social Links
  social: {
    linkedin: "https://linkedin.com/company/park-and-go",
    twitter: "https://twitter.com/parkandgo",
    github: "https://github.com/park-and-go",
    instagram: "https://instagram.com/parkandgo"
  },

  // Live Pricing / Business Logic (derived from the core system)
  businessModel: {
    currency: "EGP",
    firstHourFree: true,
    standardHourlyRate: 10,
    overstayPenaltyRate: 20,
    pilotLocation: "AAST Campus Pilot (Alexandria)"
  }
};

/* --- Initialize on DOM Loaded --- */
document.addEventListener('DOMContentLoaded', () => {
  injectConfigData();
  initThemeToggle();
  initNavigation();
  initSimulator();
  initRoiCalculator();
  initContactForm();
  initQrModal();
});

/**
 * Injects CONFIG fields into HTML elements marked with data-config attributes
 */
function injectConfigData() {
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    const val = getNestedValue(CONFIG, key);
    if (val !== undefined) {
      if (el.tagName === 'A') {
        if (key.includes('email')) el.href = `mailto:${val}`;
        else if (key.includes('phone') || key.includes('whatsapp')) el.href = `tel:${val.replace(/\s+/g, '')}`;
        else el.href = val;
      }
      el.textContent = val;
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => prev ? prev[curr] : undefined, obj);
}

/**
 * Dark / Light Theme Toggle with LocalStorage persistence
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeToggleIcon');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('pg_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pg_theme', next);
    updateThemeIcon(next, themeIcon);
  });
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'light') {
    iconEl.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
  } else {
    iconEl.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
  }
}

/**
 * Mobile Navigation & Scrollspy
 */
function initNavigation() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navLinks.classList.toggle('is-open');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Scrollspy
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  });
}

/**
 * Interactive Live Parking Simulator
 * Provides facility managers an immediate visual demonstration
 */
const SIMULATOR_DATA = {
  A: [
    { id: 'A-01', status: 'available', floor: 1, acc: false },
    { id: 'A-02', status: 'occupied', floor: 1, acc: false },
    { id: 'A-03', status: 'available', floor: 1, acc: true, accLabel: 'Accessible / Blue Badge' },
    { id: 'A-04', status: 'available', floor: 1, acc: false },
    { id: 'A-05', status: 'reserved', floor: 1, acc: false },
    { id: 'A-06', status: 'occupied', floor: 1, acc: false },
    { id: 'A-07', status: 'available', floor: 1, acc: false },
    { id: 'A-08', status: 'occupied', floor: 1, acc: false },
  ],
  B: [
    { id: 'B-01', status: 'occupied', floor: 2, acc: false },
    { id: 'B-02', status: 'available', floor: 2, acc: false },
    { id: 'B-03', status: 'available', floor: 2, acc: false },
    { id: 'B-04', status: 'reserved', floor: 2, acc: true, accLabel: 'Accessible & EV Priority' },
    { id: 'B-05', status: 'available', floor: 2, acc: false },
    { id: 'B-06', status: 'occupied', floor: 2, acc: false },
    { id: 'B-07', status: 'available', floor: 2, acc: false },
    { id: 'B-08', status: 'available', floor: 2, acc: false },
  ],
  C: [
    { id: 'C-01', status: 'available', floor: 3, acc: false },
    { id: 'C-02', status: 'occupied', floor: 3, acc: false },
    { id: 'C-03', status: 'occupied', floor: 3, acc: false },
    { id: 'C-04', status: 'available', floor: 3, acc: false },
    { id: 'C-05', status: 'reserved', floor: 3, acc: false },
    { id: 'C-06', status: 'available', floor: 3, acc: false },
    { id: 'C-07', status: 'occupied', floor: 3, acc: false },
    { id: 'C-08', status: 'available', floor: 3, acc: true, accLabel: 'Accessible' },
  ]
};

let currentZone = 'A';
let selectedSpot = null;

function initSimulator() {
  const tabs = document.querySelectorAll('.sim-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentZone = tab.getAttribute('data-zone');
      renderSimulatorGrid();
    });
  });

  renderSimulatorGrid();

  // Booking button in simulator
  const bookBtn = document.getElementById('simBookBtn');
  const releaseBtn = document.getElementById('simReleaseBtn');

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      if (!selectedSpot) return;
      if (selectedSpot.status !== 'available') {
        alert('This spot is already occupied or reserved.');
        return;
      }
      selectedSpot.status = 'reserved';
      renderSimulatorGrid();
      updateSimulatorDetail(selectedSpot, true);
    });
  }

  if (releaseBtn) {
    releaseBtn.addEventListener('click', () => {
      if (!selectedSpot) return;
      selectedSpot.status = 'available';
      renderSimulatorGrid();
      updateSimulatorDetail(selectedSpot, false);
    });
  }
}

function renderSimulatorGrid() {
  const grid = document.getElementById('simGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const spots = SIMULATOR_DATA[currentZone];

  spots.forEach(spot => {
    const btn = document.createElement('button');
    btn.className = `sim-spot-btn ${spot.status}`;
    if (selectedSpot && selectedSpot.id === spot.id) {
      btn.classList.add('active-selection');
    }

    btn.innerHTML = `
      ${spot.acc ? '<span class="sim-spot-badge-acc" title="Accessible spot">♿</span>' : ''}
      <span>${spot.id}</span>
      <span class="sim-spot-sub">${spot.status}</span>
    `;

    btn.addEventListener('click', () => {
      selectedSpot = spot;
      renderSimulatorGrid();
      updateSimulatorDetail(spot, false);
    });

    grid.appendChild(btn);
  });

  if (!selectedSpot && spots.length > 0) {
    selectedSpot = spots[0];
    updateSimulatorDetail(selectedSpot, false);
  }
}

function updateSimulatorDetail(spot, showQr) {
  const spotNameEl = document.getElementById('simSpotName');
  const spotZoneEl = document.getElementById('simSpotZone');
  const spotStatusEl = document.getElementById('simSpotStatus');
  const spotRateEl = document.getElementById('simSpotRate');
  const spotAccEl = document.getElementById('simSpotAcc');
  const qrBox = document.getElementById('simQrBox');
  const qrPassId = document.getElementById('simQrPassId');
  const bookBtn = document.getElementById('simBookBtn');

  if (spotNameEl) spotNameEl.textContent = `Spot ${spot.id}`;
  if (spotZoneEl) spotZoneEl.textContent = `Zone ${currentZone} (Level ${spot.floor})`;
  if (spotRateEl) spotRateEl.textContent = `1st Hour Free • Then 10 EGP/hr`;
  if (spotAccEl) spotAccEl.textContent = spot.acc ? (spot.accLabel || 'Yes (Priority)') : 'Standard Bay';

  if (spotStatusEl) {
    spotStatusEl.textContent = spot.status.toUpperCase();
    spotStatusEl.style.color = 
      spot.status === 'available' ? 'var(--color-accent-green)' :
      spot.status === 'reserved' ? 'var(--color-accent-amber)' : 'var(--color-accent-red)';
  }

  if (bookBtn) {
    bookBtn.disabled = spot.status !== 'available';
    bookBtn.textContent = spot.status === 'available' ? 'Simulate Driver Reservation' : 'Spot Unavailable';
  }

  if (qrBox) {
    if (showQr && spot.status === 'reserved') {
      qrBox.classList.add('active');
      const passId = `PG-${spot.id}-${Math.floor(1000 + Math.random() * 9000)}`;
      if (qrPassId) qrPassId.textContent = passId;
      // Draw simulated SVG QR pattern
      const qrSvg = document.getElementById('simQrSvg');
      if (qrSvg) qrSvg.innerHTML = generateMockQrSvg();
    } else {
      qrBox.classList.remove('active');
    }
  }
}

function generateMockQrSvg() {
  return `
    <rect width="100" height="100" fill="#FFFFFF"/>
    <path d="M10 10h25v25h-25z M15 15h15v15h-15z M18 18h9v9h-9z" fill="#0F172A"/>
    <path d="M65 10h25v25h-25z M70 15h15v15h-15z M73 18h9v9h-9z" fill="#0F172A"/>
    <path d="M10 65h25v25h-25z M15 70h15v15h-15z M18 73h9v9h-9z" fill="#0F172A"/>
    <rect x="42" y="15" width="6" height="6" fill="#2563EB"/>
    <rect x="52" y="22" width="6" height="12" fill="#0F172A"/>
    <rect x="42" y="38" width="16" height="6" fill="#0F172A"/>
    <rect x="65" y="45" width="8" height="8" fill="#10B981"/>
    <rect x="78" y="55" width="12" height="6" fill="#0F172A"/>
    <rect x="42" y="65" width="8" height="14" fill="#0F172A"/>
    <rect x="55" y="75" width="10" height="8" fill="#2563EB"/>
    <rect x="70" y="70" width="18" height="18" fill="#0F172A"/>
  `;
}

/**
 * Interactive ROI & Revenue Calculator for Location Owners
 */
function initRoiCalculator() {
  const spacesInput = document.getElementById('calcSpaces');
  const spacesVal = document.getElementById('calcSpacesVal');
  const feeInput = document.getElementById('calcFee');
  const feeVal = document.getElementById('calcFeeVal');
  const turnoverInput = document.getElementById('calcTurnover');
  const turnoverVal = document.getElementById('calcTurnoverVal');

  const resRevenue = document.getElementById('resRevenue');
  const resHours = document.getElementById('resHours');
  const resCo2 = document.getElementById('resCo2');

  function calculate() {
    const spaces = parseInt(spacesInput.value, 10);
    const fee = parseFloat(feeInput.value);
    const turnover = parseFloat(turnoverInput.value);

    if (spacesVal) spacesVal.textContent = `${spaces.toLocaleString()} bays`;
    if (feeVal) feeVal.textContent = `${fee} EGP / hr`;
    if (turnoverVal) turnoverVal.textContent = `${turnover.toFixed(1)}x / day`;

    // Business modeling:
    // Park & Go enhances turnover by 28% and recovers 12% in overstay penalty leakages
    const annualBase = spaces * turnover * (fee * 1.6) * 365;
    const additionalGain = annualBase * 0.32; // ~32% uplift
    const hoursSavedPerYear = Math.round(spaces * turnover * 0.22 * 365); // ~13 mins saved per turn
    const co2ReductionTons = Math.round((hoursSavedPerYear * 0.95 * 0.24) / 1000); // idling emissions

    if (resRevenue) resRevenue.textContent = `+${Math.round(additionalGain).toLocaleString()} EGP`;
    if (resHours) resHours.textContent = `${hoursSavedPerYear.toLocaleString()} hrs`;
    if (resCo2) resCo2.textContent = `${co2ReductionTons} tons`;
  }

  if (spacesInput && feeInput && turnoverInput) {
    spacesInput.addEventListener('input', calculate);
    feeInput.addEventListener('input', calculate);
    turnoverInput.addEventListener('input', calculate);
    calculate();
  }
}

/**
 * Contact & Demo Inquiry Form Handler
 */
function initContactForm() {
  const form = document.getElementById('partnershipForm');
  const successBanner = document.getElementById('formSuccessBanner');
  const resetBtn = document.getElementById('formResetBtn');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (!input.value.trim()) {
        isValid = false;
        if (feedback) feedback.classList.add('active');
        input.style.borderColor = 'var(--color-accent-red)';
      } else {
        if (feedback) feedback.classList.remove('active');
        input.style.borderColor = 'var(--border-color)';
      }
    });

    if (!isValid) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Inquiry...</span>`;
    }

    setTimeout(() => {
      form.style.display = 'none';
      if (successBanner) successBanner.classList.add('active');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Submit Partnership Request</span>`;
      }
    }, 800);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successBanner) successBanner.classList.remove('active');
    });
  }
}

/**
 * Presentation QR Code Modal
 * Instant scan code for pitch meetings and presentations
 */
function initQrModal() {
  const trigger = document.getElementById('qrModalTrigger');
  const modal = document.getElementById('qrModal');
  const closeBtn = document.getElementById('qrModalClose');
  const copyBtn = document.getElementById('copyUrlBtn');
  const urlDisplay = document.getElementById('qrModalUrl');
  const qrContainer = document.getElementById('modalQrCode');

  if (!modal) return;

  const currentUrl = window.location.href.split('#')[0];
  if (urlDisplay) urlDisplay.textContent = currentUrl;

  // Generate dynamic QR Code for the link
  if (qrContainer) {
    const encoded = encodeURIComponent(currentUrl);
    qrContainer.innerHTML = `
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}" 
           alt="Scan to open Park & Go on mobile" 
           loading="lazy"
           onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'padding:2rem;font-weight:700;color:#0F172A\\'>Scan: ${currentUrl}</div>';"
      />
    `;
  }

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (trigger) trigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(currentUrl).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        prompt('Copy this link:', currentUrl);
      });
    });
  }
}
