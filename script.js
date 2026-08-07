/**
 * Ravendra Patel — Minimalist Editorial Portfolio Logic
 * Handles dynamic data rendering, GitHub API caching/fallback,
 * spotlight mouse effects, scroll-spy navigation, and clipboard actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Auto Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Render Static & Centralized Data
  renderNowSection();
  renderProjects('all');
  renderSkills();
  renderJourney();

  // 3. Initialize Interactive Systems
  initProjectFilters();
  initSpotlightCards();
  initNavbarScrollSpy();
  initMobileMenu();
  initCopyEmailActions();

  // 4. Fetch Live GitHub Repositories with Static Fallback
  fetchGitHubRepositories();
});

/**
 * 1. Render Now / Currently Section
 */
function renderNowSection() {
  const container = document.getElementById('now-container');
  if (!container || !window.PORTFOLIO_DATA) return;

  const { now } = window.PORTFOLIO_DATA;
  container.innerHTML = now.map((item, index) => `
    <article class="now-card spotlight-card p-6 rounded-xl flex flex-col justify-between gap-6" data-index="${index}">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">${escapeHtml(item.category)}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-accent/60"></span>
        </div>
        <h3 class="text-base font-semibold text-white tracking-tight">${escapeHtml(item.title)}</h3>
        <p class="text-xs sm:text-sm text-secondary font-light leading-relaxed">${escapeHtml(item.description)}</p>
      </div>
      <div class="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
        ${item.tags.map(t => `<span class="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">${escapeHtml(t)}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

/**
 * 2. Render Selected Work / Projects
 */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container || !window.PORTFOLIO_DATA) return;

  const { projects } = window.PORTFOLIO_DATA;
  
  const filtered = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'fullstack') return p.category.toLowerCase().includes('full-stack') || p.category.toLowerCase().includes('web');
    if (filter === 'backend') return p.category.toLowerCase().includes('backend') || p.category.toLowerCase().includes('systems');
    if (filter === 'algorithms') return p.category.toLowerCase().includes('algorithms') || p.category.toLowerCase().includes('ai');
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-xs font-mono text-zinc-500 border border-white/10 rounded-xl">No projects found in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <article class="project-card spotlight-card p-6 sm:p-8 rounded-xl space-y-6" data-category="${p.category.toLowerCase()}">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span class="project-number">${escapeHtml(p.id)}</span>
            <span class="text-xs font-mono text-accent uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08]">${escapeHtml(p.category)}</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white pt-2">${escapeHtml(p.title)}</h3>
          <p class="text-xs font-mono text-zinc-400">${escapeHtml(p.subtitle)}</p>
        </div>

        <div class="flex items-center gap-3 self-start sm:self-auto">
          ${p.demo ? `
            <a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors" aria-label="Open live demo of ${escapeHtml(p.title)}">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Demo</span>
              <span>↗</span>
            </a>
          ` : ''}
          <a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all" aria-label="View source code for ${escapeHtml(p.title)} on GitHub">
            <svg class="w-3.5 h-3.5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Source Code</span>
            <span class="text-zinc-500">↗</span>
          </a>
        </div>
      </div>

      <div class="space-y-3">
        <p class="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">${escapeHtml(p.description)}</p>
        <div class="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-secondary leading-relaxed">
          <strong class="text-zinc-300 font-mono text-[11px] uppercase tracking-wider block mb-1">Problem Statement:</strong>
          ${escapeHtml(p.problem)}
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
        ${p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    </article>
  `).join('');

  initSpotlightCards();
}

/**
 * 3. Render Skills Matrix
 */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container || !window.PORTFOLIO_DATA) return;

  const { skills } = window.PORTFOLIO_DATA;
  container.innerHTML = skills.map(group => `
    <div class="skill-card spotlight-card p-6 rounded-xl space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <h3 class="text-xs font-mono font-semibold uppercase tracking-widest text-accent">${escapeHtml(group.group)}</h3>
        <span class="text-[10px] font-mono text-zinc-500">${group.items.length} skills</span>
      </div>
      <div class="space-y-2">
        ${group.items.map(item => `
          <div class="skill-item">
            <span class="text-xs font-medium text-zinc-200">${escapeHtml(item.name)}</span>
            <span class="text-[10px] font-mono text-zinc-500">${escapeHtml(item.note)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * 4. Render Evolution Journey
 */
function renderJourney() {
  const container = document.getElementById('journey-container');
  if (!container || !window.PORTFOLIO_DATA) return;

  const { journey } = window.PORTFOLIO_DATA;
  container.innerHTML = journey.map(j => `
    <div class="journey-item py-4">
      <span class="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">${escapeHtml(j.period)}</span>
      <h3 class="text-base sm:text-lg font-semibold text-white tracking-tight">${escapeHtml(j.title)}</h3>
      <p class="text-xs sm:text-sm text-secondary font-light mt-1 leading-relaxed max-w-3xl">${escapeHtml(j.details)}</p>
    </div>
  `).join('');
}

/**
 * 5. Fetch GitHub Public Repositories (with Cache & Fallback)
 */
async function fetchGitHubRepositories() {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  const CACHE_KEY = 'rp_github_repos_v1';
  const CACHE_TIME_KEY = 'rp_github_repos_time';
  const CACHE_DURATION = 3600 * 1000; // 1 hour

  // Check LocalStorage Cache First
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION)) {
    try {
      const parsed = JSON.parse(cachedData);
      renderRepoCards(parsed);
      return;
    } catch (e) {
      console.warn('Failed to parse cached GitHub data', e);
    }
  }

  // Fetch Live from GitHub API
  try {
    const res = await fetch('https://api.github.com/users/RavendraPatel09/repos?sort=updated&per_page=6');
    if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
    const data = await res.json();
    
    // Select meaningful public repos (excluding root user repo)
    const validRepos = data.filter(r => r.name !== 'RavendraPatel09' && !r.fork).slice(0, 6);
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(validRepos));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    renderRepoCards(validRepos);
  } catch (err) {
    console.info('Using static fallback for GitHub repositories:', err.message);
    if (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.fallbackRepos) {
      renderRepoCards(window.PORTFOLIO_DATA.fallbackRepos);
    }
  }
}

/**
 * Render GitHub Repo Cards
 */
function renderRepoCards(repos) {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  container.innerHTML = repos.map(repo => {
    const lang = repo.language || 'Code';
    const langClass = `lang-${lang.replace(/\+/g, 'p').replace(/#/g, 'sharp')}`;
    const dateStr = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent';

    return `
      <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="github-repo-card spotlight-card p-6 rounded-xl flex flex-col justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Repository ${escapeHtml(repo.name)} on GitHub">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-zinc-400 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <h4 class="text-sm font-semibold text-white group-hover:text-accent transition-colors truncate max-w-[180px]">${escapeHtml(repo.name)}</h4>
            </div>
            <span class="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">↗</span>
          </div>
          <p class="text-xs text-secondary font-light line-clamp-2 leading-relaxed">
            ${escapeHtml(repo.description || 'Open source software repository by Ravendra Patel.')}
          </p>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
          <div class="flex items-center gap-1.5">
            <span class="lang-dot ${langClass}"></span>
            <span>${escapeHtml(lang)}</span>
          </div>
          <span class="text-zinc-500">${dateStr}</span>
        </div>
      </a>
    `;
  }).join('');

  initSpotlightCards();
}

/**
 * 6. Mouse-Following Spotlight Card Glow
 */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 7. Project Category Filters
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });
}

/**
 * 8. Navbar Scroll-Spy & Scrolled Header Styling
 */
function initNavbarScrollSpy() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header Blur Enhancement
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll-Spy Active Indicator
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * 9. Mobile Navigation Toggle
 */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  function toggleMenu(open) {
    const isExpanded = open !== undefined ? open : menu.classList.contains('hidden');
    if (isExpanded) {
      menu.classList.remove('hidden');
      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      menu.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  btn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/**
 * 10. Copy Email Clipboard Actions & Toast Feedback
 */
function initCopyEmailActions() {
  const emailToCopy = "patelsamerth9@gmail.com";
  const contactBtn = document.getElementById('copy-email-contact');
  const mobileBtn = document.getElementById('copy-email-mobile');

  function copyAction() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailToCopy).then(() => showToast());
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = emailToCopy;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast();
      } catch (err) {
        console.error('Copy fallback failed', err);
      }
      document.body.removeChild(textArea);
    }
  }

  contactBtn?.addEventListener('click', copyAction);
  mobileBtn?.addEventListener('click', copyAction);
}

function showToast(msg = 'Email copied to clipboard') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast) return;

  if (msgEl) msgEl.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Utility: HTML Escape for safe DOM injection
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
