export const site = {
  name: 'EMTEK',
  url: 'https://emtek.lk',
  tagline: 'Turning Complexity Into Clarity',
  description:
    'We help businesses run smarter through custom ERP, tailored software, and reliable IT services, partnering with you from development, through deployment, and into dedicated ongoing support.',
  /** One-line version for tight spots such as the footer */
  shortDescription: 'Custom ERP, tailored software, and reliable IT services, from development to ongoing support.',
  email: 'hello@emtek.lk',
  phone: '+94 77 254 0120',
  phoneHref: 'tel:+94772540120',
  country: 'LK',
  address: {
    street: '48A, Papiliyana Road',
    city: 'Nugegoda',
    postalCode: '10250',
    country: 'Sri Lanka',
  },
};

/** One-line and multi-line forms of the office address */
export const addressLine = `${site.address.street}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`EMTEK, ${addressLine}`)}`;

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'ERP', href: '/erp' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Chat widget (src/components/ChatWidget.astro).
 * enabled: set false to remove it from every page.
 * whatsapp: international number without "+" or spaces. CONFIRM this number is on WhatsApp before launch.
 * Messages are posted to /api/contact (the Cloudflare Pages Function that emails hello@emtek.lk), so no third-party
 * chat script is loaded. To use a hosted service instead (Tawk.to, Tidio, Crisp...), see the note in ChatWidget.astro.
 */
export const chat = {
  enabled: true,
  whatsapp: '94772540120',
  topics: ['ERP & business solutions', 'Custom software & apps', 'Managed IT & cloud', 'Something else'],
};
