// Small progressive-enhancement script: scroll reveal, parallax, hero tilt, count-up, sticky header, progress bar.
// Every effect is skipped when the visitor prefers reduced motion, and the page is fully usable without it.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

const header = document.querySelector<HTMLElement>('.site-header');
const progressArc = document.querySelector<SVGElement>('.to-top-arc');
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
      span.style.opacity = String(0.65 + 0.35 * t);
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
    if (progressArc) progressArc.style.strokeDashoffset = String(100 - (max > 0 ? Math.min(y / max, 1) : 0) * 100);
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

const phone = matchMedia('(max-width: 639.98px)');

// Accordions ([data-collapse-phone]): closed on phones, open everywhere else. Without JS they simply stay open.
const collapsibles = [...document.querySelectorAll<HTMLDetailsElement>('[data-collapse-phone]')];
const syncCollapsibles = () => collapsibles.forEach((d) => (d.open = !phone.matches));
syncCollapsibles();
phone.addEventListener('change', syncCollapsibles);



// The logo strip scrolls on its own, so every logo will be needed within seconds. Safari leaves off-screen lazy images in
// a moving track unloaded (blank tiles), so once the page has finished loading, fetch them all (after LCP, off the critical path).
addEventListener('load', () => {
  const warm = () => document.querySelectorAll<HTMLImageElement>('.marquee-track img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
  'requestIdleCallback' in window ? requestIdleCallback(warm) : setTimeout(warm, 500);
});

// 3D coin: press and hold to turn it by hand. Its own spin/tilt/bob pause while held (so they resume from the same point), and
// on release the extra rotation springs back to zero, leaving the coin upright and back in its original rhythm.
for (const coin of document.querySelectorAll<HTMLElement>('[data-coin]')) {
  const layer = coin.querySelector<HTMLElement>('.coin-drag');
  if (!layer) continue;
  let startX = 0, startY = 0, startRx = 0, startRy = 0, rx = 0, ry = 0, holding = false;
  const apply = () => (layer.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`);
  coin.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    holding = true;
    coin.setPointerCapture(e.pointerId);
    coin.setAttribute('data-drag', '');
    layer.style.transition = 'none';
    [startX, startY, startRx, startRy] = [e.clientX, e.clientY, rx, ry];
  });
  coin.addEventListener('pointermove', (e) => {
    if (!holding) return;
    ry = startRy + (e.clientX - startX) * 0.55;
    rx = Math.max(-75, Math.min(75, startRx - (e.clientY - startY) * 0.55));
    apply();
  });
  const release = () => {
    if (!holding) return;
    holding = false;
    coin.removeAttribute('data-drag');
    // Settle by the short way round (a few spins shouldn't unwind in reverse), then spring back to upright
    ry = ((((ry + 180) % 360) + 360) % 360) - 180;
    apply();
    void layer.offsetWidth;
    layer.style.transition = 'transform 1.2s cubic-bezier(0.2, 1.35, 0.3, 1)';
    rx = ry = 0;
    apply();
  };
  coin.addEventListener('dragstart', (e) => e.preventDefault());
  coin.addEventListener('pointerup', release);
  coin.addEventListener('pointercancel', release);
  coin.addEventListener('lostpointercapture', release);
}

// Swipe rows: pagination dots (count + current position) and a one-time nudge that shows the row moves.
for (const row of document.querySelectorAll<HTMLElement>('.snap-lg, .snap-md, .snap-ph')) {
  const items = [...row.children] as HTMLElement[];
  if (items.length < 2) continue;
  const isRow = () => getComputedStyle(row).overflowX === 'auto';
  const pad = () => parseFloat(getComputedStyle(row).paddingLeft) || 0;
  const leftOf = (el: HTMLElement) => el.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft - pad();

  const dots = document.createElement('div');
  dots.className = 'snap-dots';
  dots.setAttribute('role', 'group');
  dots.setAttribute('aria-label', 'Choose an item');
  if (row.dataset.dots === 'light') dots.dataset.tone = 'light';
  const buttons = items.map((item, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show item ${i + 1} of ${items.length}`);
    b.addEventListener('click', () => row.scrollTo({ left: leftOf(item), behavior: reduceMotion ? 'auto' : 'smooth' }));
    dots.append(b);
    return b;
  });
  row.after(dots);

  const update = () => {
    dots.hidden = !isRow();
    // A horizontally scrolling region must be reachable by keyboard (arrow keys scroll it once focused)
    if (dots.hidden) {
      row.removeAttribute('tabindex');
      return;
    }
    row.tabIndex = 0;
    if (!row.hasAttribute('aria-label')) row.setAttribute('aria-label', 'Scrollable list, use arrow keys or swipe');
    const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
    let active = atEnd ? items.length - 1 : 0;
    if (!atEnd) {
      let best = Infinity;
      items.forEach((item, i) => {
        const d = Math.abs(leftOf(item) - row.scrollLeft);
        if (d < best) [best, active] = [d, i];
      });
    }
    buttons.forEach((b, i) => b.toggleAttribute('aria-current', i === active) || b.removeAttribute('aria-current'));
    buttons.forEach((b, i) => i === active && b.setAttribute('aria-current', 'true'));
  };
  let queued = false;
  row.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  }, { passive: true });
  new ResizeObserver(update).observe(row);
  update();

  // One gentle nudge the first time the row is mostly on screen, unless the visitor has already touched it
  if (!reduceMotion) {
    let touched = false;
    for (const type of ['pointerdown', 'touchstart', 'wheel', 'keydown']) row.addEventListener(type, () => (touched = true), { once: true, passive: true });
    const hint = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        hint.disconnect();
        if (!isRow() || touched || row.scrollLeft > 0) return;
        row.style.scrollSnapType = 'none';
        row.scrollTo({ left: 44, behavior: 'smooth' });
        setTimeout(() => {
          if (!touched) row.scrollTo({ left: 0, behavior: 'smooth' });
          setTimeout(() => (row.style.scrollSnapType = ''), 500);
        }, 800);
      },
      { threshold: 0.6 },
    );
    hint.observe(row);
  }
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

  // The reveal callback is shared by two observers. Most elements reveal once 12% of them is on screen. An element
  // taller than that can ever show (a long legal-text card on a short phone screen, for example) would never reach 12%
  // and stay invisible, so very tall elements reveal as soon as any part of them enters.
  const onReveal: IntersectionObserverCallback = (entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.left - b.boundingClientRect.left || a.boundingClientRect.top - b.boundingClientRect.top);
    visible.forEach((entry, i) => {
      const el = entry.target as HTMLElement;
      observer.unobserve(el);
      tallObserver.unobserve(el);
      el.style.setProperty('--d', `${Math.min(i, 5) * 70}ms`);
      el.classList.add('in');
      // Hand control back to the element's own hover styles once the entrance has finished
      setTimeout(() => {
        el.classList.remove('reveal', 'in');
        el.style.removeProperty('--d');
      }, 900 + Math.min(i, 5) * 70);
    });
  };
  const observer = new IntersectionObserver(onReveal, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  const tallObserver = new IntersectionObserver(onReveal, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
  // 12% of the element must fit in the visible band (viewport minus the 6% bottom margin)
  const isTall = (el: HTMLElement) => el.getBoundingClientRect().height * 0.12 > innerHeight * 0.94 * 0.8;
  for (const el of targets) {
    el.classList.add('reveal');
    (isTall(el) ? tallObserver : observer).observe(el);
  }

  // Coin flip: starts its loop once scrolled into view, instead of spinning off-screen from page load
  for (const coin of document.querySelectorAll<HTMLElement>('[data-coin]')) {
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
