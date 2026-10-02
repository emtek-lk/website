import type { ImageMetadata } from 'astro';
import mdi from '@iconify-json/mdi/icons.json';
import shamil from '../team_members/Shamil_Suraweera.jpg';
import ashan from '../team_members/Ashan_Sandeepa.png';
import safry from '../team_members/Muhammed_Safry.jpg';

export interface TeamMember {
  name: string;
  /** Job title, also used in Person structured data */
  role: string;
  /** One line describing what they work on */
  focus: string;
  skills: string[];
  photo: ImageMetadata;
  linkedin: string;
  github: string;
}

export const team: TeamMember[] = [
  {
    name: 'Shamil Suraweera',
    role: 'ERP & Data Solutions Architect',
    focus: 'Designs the data foundations and system architecture behind our ERP implementations.',
    skills: ['ERP', 'Data engineering', 'System design'],
    photo: shamil,
    linkedin: 'https://www.linkedin.com/in/shamilsuraweera/',
    github: 'https://github.com/shamilsuraweera',
  },
  {
    name: 'Ashan Sandeepa',
    role: 'Infrastructure, Security & Cloud Engineer',
    focus: 'Keeps client systems secure, available, and running smoothly across cloud and on-premise environments.',
    skills: ['Infrastructure', 'Cybersecurity', 'Cloud'],
    photo: ashan,
    linkedin: 'https://www.linkedin.com/in/ashansandeepa/',
    github: 'https://github.com/AshanSandeepa1',
  },
  {
    name: 'Muhammed Safry',
    role: 'Software & DevOps Engineer',
    focus: 'Builds our custom applications and the delivery pipelines that ship them reliably.',
    skills: ['Software development', 'DevOps', 'CI/CD'],
    photo: safry,
    linkedin: 'https://www.linkedin.com/in/muhammed-safry/',
    github: 'https://github.com/msafryx',
  },
];

// Fill-based brand glyphs (24x24) for the social links
const glyph = (name: 'linkedin' | 'github') => (mdi as unknown as { icons: Record<string, { body: string }> }).icons[name].body;
export const socialIcons = { linkedin: glyph('linkedin'), github: glyph('github') };
