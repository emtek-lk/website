// Small progressive-enhancement script: scroll reveal, parallax, hero tilt, count-up, sticky header, progress bar.
// Every effect is skipped when the visitor prefers reduced motion, and the page is fully usable without it.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

const header = document.querySelector<HTMLElement>('.site-header');
const progress = document.querySelector<HTMLElement>('.scroll-progress');
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
const toTop = document.querySelector<HTMLButtonElement>('.to-top');

// Word-by-word reveal for headings marked [data-words]: each word fades from muted to full as the heading
// scrolls up through the viewport. Set up in initMotion (skipped for reduced motion, where text stays as-is).
const wordGroups: { el: HTMLElement; spans: HTMLElement[] }[] = [];
const updateWords = () => {
  for (const { el, spans } of wordGroups) {
    const r = el.getBoundingClientRect();
    // 0 when the heading enters near the bottom of the screen, 1 once it has reached the upper-middle
    const p = Math.min(Math.max((innerHeight * 0.88 - r.top) / (innerHeight * 0.46), 0), 1);
    const n = spans.length;
    spans.forEach((span, i) => {
      const t = Math.min(Math.max(p * (n + 2) - i, 0), 1);
      span.style.opacity = String(0.3 + 0.7 * t);
    });
  }
};

// Scroll-linked state (header glass, progress bar, parallax), batched with requestAnimationFrame
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header?.toggleAttribute('data-scrolled', y > 24);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    toTop?.toggleAttribute('data-visible', y > 600);
    if (wordGroups.length) updateWords();
    if (!reduceMotion && y < 1400) {
      // Written straight to the element's own translate (not a CSS variable) so no child styles are recalculated
      for (const el of parallax) el.style.translate = `0 ${-y * Number(el.dataset.parallax)}px`;
    }
    ticking = false;
  });
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop?.addEventListener('click', () => {
  scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  // The button fades out, so hand focus to the logo link rather than leaving it on a hidden control
  document.querySelector<HTMLElement>('.site-nav > a')?.focus({ preventScroll: true });
});

// Pause looping decoration (orbit, marquee, float, hero pan, coin) in sections that are off-screen
const loopObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) e.target.classList.toggle('is-offscreen', !e.isIntersecting);
  },
  { rootMargin: '200px 0px' },
);
for (const el of document.querySelectorAll('main > section, main > div > section, footer')) loopObserver.observe(el);

// ---------- Navigation behavior (runs regardless of motion preference) ----------

// Desktop mega menus open from CSS (hover / focus-within). This mirrors that state to aria-expanded
// and lets Escape dismiss an open menu until the pointer or focus leaves the item.
for (const item of document.querySelectorAll<HTMLElement>('.site-nav li.group')) {
  const trigger = item.querySelector<HTMLElement>(':scope > a[aria-expanded]');
  if (!trigger) continue;
  const sync = () => trigger.setAttribute('aria-expanded', String(!item.hasAttribute('data-dismissed') && (item.matches(':hover') || item.matches(':focus-within'))));
  const reset = () => {
    item.removeAttribute('data-dismissed');
    sync();
  };
  item.addEventListener('pointerenter', sync);
  item.addEventListener('pointerleave', reset);
  item.addEventListener('focusin', sync);
  item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget as Node | null)) reset();
  });
}

// Escape dismisses whichever mega menu is open (hovered or focused) until the pointer or focus leaves it
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  for (const item of document.querySelectorAll<HTMLElement>('.site-nav li.group')) {
    if (!item.matches(':hover') && !item.matches(':focus-within')) continue;
    item.setAttribute('data-dismissed', '');
    item.querySelector<HTMLElement>(':scope > a[aria-expanded]')?.setAttribute('aria-expanded', 'false');
    if (item.contains(document.activeElement)) item.querySelector<HTMLElement>(':scope > a')?.focus();
  }
});

// Mobile menu (<details>): close on Escape, on a tap outside, and after choosing a same-page link; lock page scroll while open
const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
if (mobileMenu) {
  const root = document.documentElement;
  const close = () => {
    mobileMenu.open = false;
  };
  mobileMenu.addEventListener('toggle', () => {
    root.style.overflow = mobileMenu.open ? 'hidden' : '';
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.open) {
      close();
      mobileMenu.querySelector<HTMLElement>('summary')?.focus();
    }
  });
  document.addEventListener('pointerdown', (e) => {
    if (mobileMenu.open && !mobileMenu.contains(e.target as Node)) close();
  });
  mobileMenu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close();
  });
}

if (!reduceMotion) requestAnimationFrame(initMotion);

function initMotion() {
  for (const el of document.querySelectorAll<HTMLElement>('[data-words]')) {
    const text = el.textContent?.trim() ?? '';
    if (!text) continue;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    const spans = text.split(/\s+/).map((word, i, all) => {
      const span = document.createElement('span');
      span.textContent = word + (i < all.length - 1 ? ' ' : '');
      span.setAttribute('aria-hidden', 'true');
      span.className = 'word';
      el.append(span);
      return span;
    });
    wordGroups.push({ el, spans });
  }
  updateWords();

  // Reveal: only elements below the fold are hidden, so nothing flashes on first paint
  const selector = '.card, .tech-wall > li, .clients-wall > li, .prose-emtek > *, [data-reveal], .max-w-2xl:has(> .eyebrow)';
  const targets = [...document.querySelectorAll<HTMLElement>(selector)].filter(
    (el) =>
      !el.parentElement?.closest(selector) &&
      // Cards inside a swipe row (overflow-x: auto) stay visible: they'd otherwise fade in only after being swiped to
      getComputedStyle(el.parentElement as HTMLElement).overflowX !== 'auto' &&
      el.getBoundingClientRect().top > innerHeight * 0.92,
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.left - b.boundingClientRect.left || a.boundingClientRect.top - b.boundingClientRect.top);
      visible.forEach((entry, i) => {
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.style.setProperty('--d', `${Math.min(i, 5) * 70}ms`);
        el.classList.add('in');
        // Hand control back to the element's own hover styles once the entrance has finished
        setTimeout(() => {
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--d');
        }, 900 + Math.min(i, 5) * 70);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  for (const el of targets) {
    el.classList.add('reveal');
    observer.observe(el);
  }

  // Coin flip: starts its loop once scrolled into view, instead of spinning off-screen from page load
  const coin = document.querySelector<HTMLElement>('[data-coin]');
  if (coin) {
    const coinObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        coin.classList.add('spin');
        coinObserver.disconnect();
      },
      { threshold: 0.4 },
    );
    coinObserver.observe(coin);
  }

  // Hero tilt follows the pointer
  const tilt = document.querySelector<HTMLElement>('[data-tilt]');
  const hero = tilt?.closest('section');
  if (tilt && hero && finePointer) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
      tilt.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    });
    hero.addEventListener('pointerleave', () => {
      tilt.style.setProperty('--rx', '0deg');
      tilt.style.setProperty('--ry', '0deg');
    });
  }

  // Count-up numbers in the hero mock-up
  for (const el of document.querySelectorAll<HTMLElement>('[data-count]')) {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const { prefix = '', suffix = '' } = el.dataset;
    const format = (v: number) => prefix + v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const start = performance.now() + 500;
    const duration = 1800;
    el.textContent = format(0);
    const step = (now: number) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      el.textContent = format(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
