export const site = {
  name: 'EMTEK',
  url: 'https://emtek.lk',
  tagline: 'Turning Complexity Into Clarity',
  description:
    'We help businesses run smarter through custom ERP, tailored software, and reliable IT services, partnering with you from development, through deployment, and into dedicated ongoing support.',
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
