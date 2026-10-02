// Small progressive-enhancement script: scroll reveal, parallax, hero tilt, count-up, sticky header, progress bar.
// Every effect is skipped when the visitor prefers reduced motion, and the page is fully usable without it.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

const header = document.querySelector<HTMLElement>('.site-header');
const progress = document.querySelector<HTMLElement>('.scroll-progress');
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

// Scroll-linked state (header glass, progress bar, parallax), batched with requestAnimationFrame
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header?.toggleAttribute('data-scrolled', y > 24);
    progress?.style.setProperty('--p', String(max > 0 ? Math.min(y / max, 1) : 0));
    if (!reduceMotion && y < 1400) {
      for (const el of parallax) el.style.setProperty('--py', `${-y * Number(el.dataset.parallax)}px`);
    }
    ticking = false;
  });
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (!reduceMotion) requestAnimationFrame(initMotion);

function initMotion() {
  // Reveal: only elements below the fold are hidden, so nothing flashes on first paint
  const selector = '.card, .tech-wall > li, .clients-wall > li, .prose-emtek > *, [data-reveal], .max-w-2xl:has(> .eyebrow)';
  const targets = [...document.querySelectorAll<HTMLElement>(selector)].filter(
    (el) => !el.parentElement?.closest(selector) && el.getBoundingClientRect().top > innerHeight * 0.92,
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.left - b.boundingClientRect.left || a.boundingClientRect.top - b.boundingClientRect.top);
      visible.forEach((entry, i) => {
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.style.setProperty('--d', `${Math.min(i, 7) * 90}ms`);
        el.classList.add('in');
        // Hand control back to the element's own hover styles once the entrance has finished
        setTimeout(() => {
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--d');
        }, 1300 + Math.min(i, 7) * 90);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  for (const el of targets) {
    el.classList.add('reveal');
    observer.observe(el);
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
