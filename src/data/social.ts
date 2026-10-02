import mdi from '@iconify-json/mdi/icons.json';
import { siX } from 'simple-icons';

const mdiBody = (name: string) => (mdi as unknown as { icons: Record<string, { body: string }> }).icons[name].body;

export interface SocialLink {
  id: 'facebook' | 'instagram' | 'linkedin' | 'x' | 'youtube' | 'github';
  label: string;
  href: string;
  /** Inner markup of a 24x24 fill-based SVG */
  icon: string;
  /** Hover background colour */
  color: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/emtek.lk/', icon: mdiBody('facebook'), color: '#1877f2' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/emtek.lk/', icon: mdiBody('instagram'), color: '#d62976' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/emtek-lk/', icon: mdiBody('linkedin'), color: '#0a66c2' },
  { id: 'x', label: 'X', href: 'https://x.com/emtek_lk', icon: `<path d="${siX.path}"/>`, color: '#000000' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@emtek-lk', icon: mdiBody('youtube'), color: '#ff0000' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/emtek-lk', icon: mdiBody('github'), color: '#24292f' },
];

/** Profile URLs for Organization structured data */
export const socialProfiles = socialLinks.map((s) => s.href);
