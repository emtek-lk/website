// Build-time lookup from a technology's display name to an inline SVG logo.
// Sources: Simple Icons (CC0) and the Iconify "logos" / "devicon" sets. Nothing here ships to the browser as JS.
import {
  siOdoo,
  siSap,
  siSage,
  siPostgresql,
  siMysql,
  siMongodb,
  siApachekafka,
  siTalend,
  siClaude,
  siPython,
  siDotnet,
  siNodedotjs,
  siDjango,
  siFastapi,
  siSpringboot,
  siGo,
  siFlutter,
  siReact,
  siVuedotjs,
  siElectron,
  siFigma,
  siGit,
  siGithub,
  siGitlab,
  siUbuntu,
  siRedhat,
  siCentos,
  siLinux,
  siGooglecloud,
  siDocker,
  siKubernetes,
  siTerraform,
  siSplunk,
  siVeeam,
  siOpenvpn,
  siJira,
  siDatadog,
} from 'simple-icons';
import logos from '@iconify-json/logos/icons.json';
import devicon from '@iconify-json/devicon/icons.json';

export interface TechLogoData {
  /** Inner SVG markup */
  body: string;
  viewBox: string;
  /** Brand color for single-path logos; null when the artwork carries its own colors */
  color: string | null;
}

type SimpleIcon = { path: string; hex: string };
const simple = ({ path, hex }: SimpleIcon): TechLogoData => ({
  body: `<path d="${path}"/>`,
  viewBox: '0 0 24 24',
  color: `#${hex}`,
});

type IconifySet = { icons: Record<string, { body: string; width?: number; height?: number }>; width?: number; height?: number };
const iconify = (set: IconifySet, key: string): TechLogoData => {
  const icon = set.icons[key];
  if (!icon) throw new Error(`Missing icon "${key}"`);
  return { body: icon.body, viewBox: `0 0 ${icon.width ?? set.width ?? 16} ${icon.height ?? set.height ?? 16}`, color: null };
};

// Generic placeholder mark for Cortex ERP until a proper logo exists
const cortex: TechLogoData = {
  viewBox: '0 0 48 48',
  color: null,
  body: `<defs><linearGradient id="cortex-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4fa9e0"/><stop offset="1" stop-color="#1c4d8d"/></linearGradient></defs><rect width="48" height="48" rx="11" fill="url(#cortex-g)"/><path d="M24 10 35.5 16.5v15L24 38l-11.5-6.5v-15Z" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="2.2" stroke-linejoin="round"/><circle cx="24" cy="24" r="4" fill="#fff"/><path d="M24 20V10M27.5 26l8 5M20.5 26l-8 5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,
};

const L = logos as unknown as IconifySet;
const D = devicon as unknown as IconifySet;

const registry: Record<string, TechLogoData> = {
  'Cortex ERP': cortex,
  Odoo: simple(siOdoo),
  'SAP S/4HANA': simple(siSap),
  'Sage Intacct': simple(siSage),
  'Microsoft SQL Server': iconify(D, 'microsoftsqlserver'),
  PostgreSQL: simple(siPostgresql),
  MySQL: simple(siMysql),
  MongoDB: simple(siMongodb),
  'Apache Kafka': simple(siApachekafka),
  Talend: simple(siTalend),
  'OpenAI API': iconify(L, 'openai-icon'),
  'Anthropic API (Claude)': simple(siClaude),
  Python: simple(siPython),
  Java: iconify(L, 'java'),
  'C#': iconify(L, 'c-sharp'),
  'Node.js': simple(siNodedotjs),
  '.NET': simple(siDotnet),
  Django: simple(siDjango),
  FastAPI: simple(siFastapi),
  'Spring Boot': simple(siSpringboot),
  Go: simple(siGo),
  Flutter: simple(siFlutter),
  'React Native': simple(siReact),
  React: simple(siReact),
  'Vue.js': simple(siVuedotjs),
  Electron: simple(siElectron),
  Figma: simple(siFigma),
  Git: simple(siGit),
  GitHub: simple(siGithub),
  GitLab: simple(siGitlab),
  Ubuntu: simple(siUbuntu),
  'Red Hat Enterprise Linux': simple(siRedhat),
  CentOS: simple(siCentos),
  Linux: simple(siLinux),
  'Windows Server': iconify(L, 'microsoft-windows-icon'),
  AWS: iconify(L, 'aws'),
  'Google Cloud': simple(siGooglecloud),
  'Microsoft Azure': iconify(L, 'microsoft-azure'),
  Docker: simple(siDocker),
  Kubernetes: simple(siKubernetes),
  Terraform: simple(siTerraform),
  Splunk: simple(siSplunk),
  Veeam: simple(siVeeam),
  OpenVPN: simple(siOpenvpn),
  'Jira Service Management': simple(siJira),
  Datadog: simple(siDatadog),
};

/** Returns null for technologies without an available logo; the UI then shows a monogram. */
export const getTechLogo = (name: string): TechLogoData | null => {
  const key = name.replace(/\s*\(proprietary\)$/i, '');
  return registry[key] ?? null;
};

/** Names shown in the home page logo wall, in display order. */
export const featuredTech = [
  'Cortex ERP',
  'Odoo',
  'SAP S/4HANA',
  'Sage Intacct',
  'PostgreSQL',
  'Apache Kafka',
  'Python',
  'Java',
  'React',
  'Flutter',
  'Docker',
  'Kubernetes',
  'Terraform',
  'AWS',
  'Microsoft Azure',
  'Google Cloud',
];
