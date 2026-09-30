import type { IconName } from '../components/Icon.astro';

// Real product app icons, saved in src/logos/brands/ (Dynamics 365 from the open theSVG set, Odoo from github.com/odoo/odoo)
const dynamicsIcons = import.meta.glob<string>('../logos/brands/dynamics/*.svg', { eager: true, query: '?url', import: 'default' });
const odooIcons = import.meta.glob<string>('../logos/brands/odoo/*.svg', { eager: true, query: '?url', import: 'default' });

const iconFrom = (set: Record<string, string>, key: string) => {
  const match = Object.keys(set).find((path) => path.endsWith(`/${key}.svg`));
  if (!match) throw new Error(`Missing module icon "${key}"`);
  return set[match];
};
const d365 = (key: string) => iconFrom(dynamicsIcons, key);
const odoo = (key: string) => iconFrom(odooIcons, key);

export interface ErpModule {
  name: string;
  text: string;
  /** URL of the real product icon */
  icon?: string;
  /** Fallback glyph for platforms without official module icons (Cortex) */
  glyph?: IconName;
}

export interface ErpPlatform {
  slug: string;
  name: string;
  shortName: string;
  /** Key in the TechLogo registry */
  logo: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  /** Per-platform theme, applied as CSS variables */
  theme: { accent: string; accentSoft: string; accentStrong: string; heroBg: string };
  intro: { title: string; paragraphs: string[] };
  capabilities: { icon: IconName; title: string; text: string }[];
  modulesTitle: string;
  modulesLead: string;
  modules: ErpModule[];
  builtWith: string[];
  faqs: { q: string; a: string }[];
}

export const erpPlatforms: ErpPlatform[] = [
  {
    slug: 'cortex-erp',
    name: 'Cortex ERP',
    shortName: 'Cortex ERP',
    logo: 'Cortex ERP',
    seoTitle: 'Cortex ERP: Custom ERP Software Built Around Your Business',
    seoDescription:
      'Cortex is EMTEK’s own ERP platform. Finance, HR, inventory, and sales in one dashboard, tailored to your workflows, with AI automation and no generic licensing fees.',
    eyebrow: 'Our own ERP platform',
    heroTitle: 'Cortex ERP: one system, shaped around your business',
    heroLead:
      'Cortex is EMTEK’s proprietary ERP. It unifies finance, HR, inventory, and sales in a single dashboard, and because we built it, we can tailor every module to the way your team already works.',
    theme: {
      accent: '#2463b8',
      accentSoft: '#e0f2fa',
      accentStrong: '#1c4d8d',
      heroBg:
        'radial-gradient(55% 75% at 88% 12%, rgb(143 211 238 / .85) 0%, transparent 60%), radial-gradient(60% 80% at 10% 100%, rgb(28 77 141 / .9) 0%, transparent 70%), linear-gradient(120deg, #0a1f3d 0%, #163c6e 45%, #2d7fd0 100%)',
    },
    intro: {
      title: 'An ERP that fits you, instead of the other way round',
      paragraphs: [
        'Generic ERP software asks your business to change its processes to match the product. Cortex works the other way: we start from how your team operates, then configure and extend Cortex until the system mirrors it.',
        'You get one source of truth for finance, people, stock, and sales, without paying the licensing fees of large enterprise platforms, and with an engineering team that knows the codebase inside out.',
      ],
    },
    capabilities: [
      { icon: 'layers', title: 'One unified dashboard', text: 'Finance, HR, inventory, and sales in a single system of record, with shared data across every department.' },
      { icon: 'target', title: 'Tailored modules', text: 'We build custom functional modules so Cortex follows your approvals, pricing rules, and reporting.' },
      { icon: 'plug', title: 'Connected to your tools', text: 'API hooks link Cortex to the software you already use, and ETL pipelines bring your legacy data across.' },
      { icon: 'sparkles', title: 'AI built in', text: 'Automate financial reporting and let LLMs analyze invoices and supply chain records, with strict access controls.' },
      { icon: 'database', title: 'Reliable data', text: 'Secure relational databases with ACID-compliant transaction records, so every figure can be trusted.' },
      { icon: 'wallet', title: 'No generic licensing fees', text: 'Because Cortex is our own platform, you avoid the licensing costs that come with big-vendor ERP.' },
    ],
    modulesTitle: 'Cortex modules',
    modulesLead: 'Start with the core your business needs today and add modules as you grow. Every module shares the same data.',
    modules: [
      { name: 'Finance & Accounting', text: 'General ledger, payables, receivables, and automated financial reporting.', glyph: 'wallet' },
      { name: 'HR & People', text: 'Employee records, leave, and the people data that feeds payroll and reporting.', glyph: 'users' },
      { name: 'Inventory', text: 'Stock levels, movements, and reorder points across your locations.', glyph: 'box' },
      { name: 'Sales', text: 'Quotes, orders, invoicing, and customer history in one place.', glyph: 'chart' },
      { name: 'Reports & BI', text: 'Live dashboards and scheduled reports that pull from every module.', glyph: 'target' },
      { name: 'AI Automation', text: 'LLM-powered processing of invoices, documents, and supply chain records.', glyph: 'sparkles' },
      { name: 'Integrations', text: 'APIs and data pipelines that connect Cortex to your wider toolset.', glyph: 'plug' },
      { name: 'Your custom module', text: 'Have a process no off-the-shelf product covers? We build it into Cortex.', glyph: 'plus' },
    ],
    builtWith: ['Python', 'Node.js', 'PostgreSQL', 'Microsoft SQL Server', 'Apache Kafka', 'Anthropic API (Claude)', 'OpenAI API'],
    faqs: [
      {
        q: 'What is Cortex ERP?',
        a: 'Cortex is EMTEK’s proprietary ERP platform. It brings finance, HR, inventory, and sales into one dashboard, and our team tailors it to how your business already works.',
      },
      {
        q: 'How is Cortex different from off-the-shelf ERP software?',
        a: 'Because we own and build Cortex, we shape its modules around your workflows instead of asking your team to adapt to generic software. You also avoid the licensing fees of large enterprise ERP vendors.',
      },
      {
        q: 'Can Cortex connect to the software we already use?',
        a: 'Yes. We write API hooks that link Cortex with your existing tools, and run ETL (Extract, Transform, Load) pipelines to migrate data from your legacy systems.',
      },
      {
        q: 'Does Cortex support AI and automation?',
        a: 'Yes. We connect Cortex to large language models so you can automate financial reporting and analyze invoices, internal data, and supply chain records, while keeping strict data access controls in place.',
      },
      {
        q: 'Do you support Cortex after it goes live?',
        a: 'Yes. We stay on as your technology partner, maintaining and improving Cortex, and our managed IT team can look after the infrastructure, security, and backups it runs on.',
      },
    ],
  },
  {
    slug: 'microsoft-dynamics-365',
    name: 'Microsoft Dynamics 365',
    shortName: 'Dynamics 365',
    logo: 'Microsoft Dynamics 365',
    seoTitle: 'Microsoft Dynamics 365 Implementation, Customization & Integration',
    seoDescription:
      'Microsoft Dynamics 365 implementation and customization by EMTEK. Custom modules, source-level changes, integrations, data migration, and AI, adapted to your workflows.',
    eyebrow: 'Microsoft Dynamics 365',
    heroTitle: 'Dynamics 365, adapted to the way your business works',
    heroLead:
      'Keep the Microsoft platform you trust and the processes your team already knows. We implement, customize, and integrate Dynamics 365 so it fits your business, not the other way round.',
    theme: {
      accent: '#3f5fe0',
      accentSoft: '#e7ecfd',
      accentStrong: '#2f3fb8',
      heroBg:
        'radial-gradient(55% 75% at 88% 10%, rgb(122 167 255 / .85) 0%, transparent 60%), radial-gradient(60% 80% at 8% 100%, rgb(47 63 184 / .9) 0%, transparent 70%), linear-gradient(120deg, #0b1740 0%, #1f3aa8 50%, #6a5cf0 100%)',
    },
    intro: {
      title: 'Your Dynamics 365, customized at the source',
      paragraphs: [
        'Dynamics 365 is a powerful family of business applications, but out of the box it reflects Microsoft’s idea of how a business should run. We close that gap.',
        'Our engineers go beyond configuration screens: we modify behaviour at the source-code level, build custom functional modules, and connect Dynamics 365 to the rest of your systems, so your team keeps working the way it already does.',
      ],
    },
    capabilities: [
      { icon: 'rocket', title: 'Implementation', text: 'Planning, configuration, and rollout of the Dynamics 365 apps that match your processes.' },
      { icon: 'code', title: 'Source-level customization', text: 'We change how Dynamics 365 behaves, so it follows your workflows instead of generic defaults.' },
      { icon: 'layers', title: 'Custom functional modules', text: 'New capabilities built into Dynamics 365 in C# and .NET, not bolted on beside it.' },
      { icon: 'plug', title: 'Integrations', text: 'API hooks and integration platforms such as MuleSoft and Talend link Dynamics 365 to your other tools.' },
      { icon: 'database', title: 'Data migration', text: 'ETL pipelines move your legacy records into secure, ACID-compliant databases.' },
      { icon: 'sparkles', title: 'AI on your data', text: 'Automated reporting and LLM-powered analysis of invoices and supply chain data, with strict access controls.' },
    ],
    modulesTitle: 'Dynamics 365 apps we tailor',
    modulesLead: 'Dynamics 365 is a family of connected apps. We help you choose the right ones, then shape them around your processes.',
    modules: [
      { name: 'Business Central', text: 'All-in-one business management for small and mid-sized companies.', icon: d365('business-central') },
      { name: 'Finance', text: 'Financial management, accounting, budgeting, and reporting.', icon: d365('finance') },
      { name: 'Supply Chain Management', text: 'Inventory, warehousing, procurement, and production planning.', icon: d365('supply-chain-management') },
      { name: 'Sales', text: 'Pipeline, opportunities, and customer relationship management.', icon: d365('sales') },
      { name: 'Customer Service', text: 'Case management and support across every channel.', icon: d365('customer-service') },
      { name: 'Field Service', text: 'Scheduling and dispatch for teams working on site.', icon: d365('field-service') },
      { name: 'Project Operations', text: 'Project planning, resourcing, time tracking, and billing.', icon: d365('project-operations') },
      { name: 'Human Resources', text: 'Employee records, leave, and benefits management.', icon: d365('human-resources') },
      { name: 'Commerce', text: 'Unified retail across stores, online, and call center.', icon: d365('commerce') },
      { name: 'Customer Insights', text: 'Unified customer data and personalized journeys.', icon: d365('customer-insights') },
    ],
    builtWith: ['C#', '.NET', 'Microsoft SQL Server', 'Microsoft Azure', 'Python', 'Anthropic API (Claude)', 'OpenAI API'],
    faqs: [
      {
        q: 'Do you implement and customize Microsoft Dynamics 365?',
        a: 'Yes. We plan and roll out Dynamics 365, customize it at the source-code level, build custom functional modules, integrate it with your other systems, and migrate your existing data.',
      },
      {
        q: 'Can Dynamics 365 be adapted to our existing workflows?',
        a: 'That is our focus. Instead of changing established processes to fit generic software, we adapt Dynamics 365 to the way your team already works.',
      },
      {
        q: 'Can you integrate Dynamics 365 with our other systems?',
        a: 'Yes. We write API hooks and use integration platforms such as MuleSoft and Talend to connect Dynamics 365 with your CRM, payment gateways, and other business tools.',
      },
      {
        q: 'Can you migrate our data from a legacy system into Dynamics 365?',
        a: 'Yes. We run ETL (Extract, Transform, Load) pipelines to move your historical records into Dynamics 365 and its databases, keeping transaction records accurate and consistent.',
      },
      {
        q: 'Can you add AI to Dynamics 365?',
        a: 'Yes. We connect Dynamics 365 to large language models from providers such as OpenAI and Anthropic, so you can automate reporting and analyze large volumes of business data securely.',
      },
      {
        q: 'Do you provide support after go-live?',
        a: 'Yes. We partner with you from development, through deployment, and into dedicated ongoing support, including the cloud infrastructure and security around your system.',
      },
    ],
  },
  {
    slug: 'odoo',
    name: 'Odoo',
    shortName: 'Odoo',
    logo: 'Odoo',
    seoTitle: 'Odoo Implementation, Customization & Integration',
    seoDescription:
      'Odoo implementation and customization by EMTEK. Custom Python modules, integrations, data migration, and AI automation, tailored to the way your business works.',
    eyebrow: 'Odoo ERP',
    heroTitle: 'Odoo, tailored to fit the way you work',
    heroLead:
      'Odoo’s modular apps cover almost every part of a business. We implement the ones you need, build custom modules for the rest, and connect Odoo to your existing tools and data.',
    theme: {
      accent: '#714b67',
      accentSoft: '#f3e8f0',
      accentStrong: '#5d3d54',
      heroBg:
        'radial-gradient(55% 75% at 88% 10%, rgb(233 163 199 / .7) 0%, transparent 60%), radial-gradient(60% 80% at 8% 100%, rgb(113 75 103 / .95) 0%, transparent 70%), linear-gradient(120deg, #24142a 0%, #5d3d54 50%, #a0648f 100%)',
    },
    intro: {
      title: 'Open and modular, engineered for your business',
      paragraphs: [
        'Odoo gives you a broad set of integrated apps, from CRM and sales to inventory, manufacturing, and accounting. The real value comes from making those apps work the way your business does.',
        'We implement Odoo, write custom modules in Python at the source-code level, connect it to the systems you already run, and migrate your data, so your team gets a system that feels built for them.',
      ],
    },
    capabilities: [
      { icon: 'rocket', title: 'Implementation', text: 'We choose, configure, and roll out the Odoo apps that match your processes.' },
      { icon: 'code', title: 'Custom Python modules', text: 'New features and changes built at the source-code level, so Odoo follows your workflows.' },
      { icon: 'plug', title: 'Integrations', text: 'API hooks that link Odoo with your e-commerce, payment gateways, and other tools.' },
      { icon: 'database', title: 'Data migration', text: 'ETL pipelines that bring your legacy records into Odoo’s PostgreSQL database.' },
      { icon: 'sparkles', title: 'AI automation', text: 'LLM-powered reporting and document processing on top of your Odoo data.' },
      { icon: 'lifebuoy', title: 'Ongoing support', text: 'Upgrades, improvements, hosting, and help desk support after go-live.' },
    ],
    modulesTitle: 'Odoo apps we implement and extend',
    modulesLead: 'Switch on the apps you need today and add more as you grow. When an app doesn’t quite fit, we build a custom module that does.',
    modules: [
      { name: 'CRM', text: 'Track leads and opportunities through your sales pipeline.', icon: odoo('crm') },
      { name: 'Sales', text: 'Quotations, orders, and pricing in one flow.', icon: odoo('sale_management') },
      { name: 'Accounting & Invoicing', text: 'Invoices, payments, and financial records.', icon: odoo('account') },
      { name: 'Inventory', text: 'Stock, warehouses, and product movements.', icon: odoo('stock') },
      { name: 'Purchase', text: 'Vendor quotations, purchase orders, and bills.', icon: odoo('purchase') },
      { name: 'Manufacturing', text: 'Bills of materials, work orders, and production.', icon: odoo('mrp') },
      { name: 'Point of Sale', text: 'In-store sales connected to stock and accounting.', icon: odoo('point_of_sale') },
      { name: 'Employees', text: 'Staff records and organization structure.', icon: odoo('hr') },
      { name: 'Recruitment', text: 'Job positions, applicants, and hiring stages.', icon: odoo('hr_recruitment') },
      { name: 'Expenses', text: 'Employee expense claims and approvals.', icon: odoo('hr_expense') },
      { name: 'Project', text: 'Tasks, timelines, and team collaboration.', icon: odoo('project') },
      { name: 'Website', text: 'A website connected to your Odoo data.', icon: odoo('website') },
      { name: 'Email Marketing', text: 'Campaigns sent to contacts already in Odoo.', icon: odoo('mass_mailing') },
      { name: 'Your custom module', text: 'A process no standard app covers, built in Python.', glyph: 'plus' },
    ],
    builtWith: ['Python', 'PostgreSQL', 'Docker', 'Ubuntu', 'Anthropic API (Claude)', 'OpenAI API'],
    faqs: [
      {
        q: 'Do you implement and customize Odoo?',
        a: 'Yes. We implement the Odoo apps your business needs, build custom modules in Python at the source-code level, integrate Odoo with your other systems, and migrate your existing data.',
      },
      {
        q: 'Can Odoo be tailored to our existing processes?',
        a: 'Yes. Rather than changing your established workflows to fit the software, we adapt Odoo through configuration and custom modules so it mirrors how your team already works.',
      },
      {
        q: 'Can you integrate Odoo with our other tools?',
        a: 'Yes. We write API hooks that connect Odoo with e-commerce platforms, payment gateways, CRMs, and other business software, so data flows without re-keying.',
      },
      {
        q: 'Can you migrate our data into Odoo?',
        a: 'Yes. We use ETL (Extract, Transform, Load) pipelines to move records from spreadsheets and legacy systems into Odoo’s PostgreSQL database accurately.',
      },
      {
        q: 'Can you add AI to Odoo?',
        a: 'Yes. We connect Odoo to large language models to automate reporting and process documents such as invoices, while keeping strict control over who can access which data.',
      },
      {
        q: 'Do you host and support Odoo after go-live?',
        a: 'Yes. Our managed IT team can host Odoo on secure cloud infrastructure with backups and monitoring, and we provide ongoing improvements and help desk support.',
      },
    ],
  },
];

export const getErpPlatform = (slug: string) => erpPlatforms.find((p) => p.slug === slug);

/** Other ERP platforms EMTEK works with (no dedicated page yet) */
export const otherErps = ['SAP S/4HANA', 'Oracle NetSuite', 'Sage Intacct'];

/** Delivery process shared by every ERP engagement */
export const erpProcess: { icon: IconName; title: string; text: string }[] = [
  { icon: 'target', title: 'Discover', text: 'We map how your business runs today: your processes, data, systems, and the problems you want solved.' },
  { icon: 'layers', title: 'Design & configure', text: 'We choose the right modules and configure the platform around your workflows.' },
  { icon: 'code', title: 'Customize & integrate', text: 'We build custom modules and API hooks for everything the standard product doesn’t cover.' },
  { icon: 'database', title: 'Migrate & go live', text: 'ETL pipelines move your legacy data across, then we train your team and switch on the system.' },
  { icon: 'lifebuoy', title: 'Support & improve', text: 'We stay on after launch with support, improvements, AI automation, and the infrastructure underneath.' },
];

/** Why EMTEK, shared across ERP pages */
export const erpExpertise: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'layers',
    title: 'ERP is our core',
    text: 'We build our own ERP, Cortex, and implement Dynamics 365, Odoo, SAP S/4HANA, Oracle NetSuite, and Sage Intacct. We understand ERP from the inside.',
  },
  {
    icon: 'code',
    title: 'Engineers, not just consultants',
    text: 'Our team works at the source-code level in Python, Java, C#, and Node.js, so we can change how the software behaves, not only its settings.',
  },
  {
    icon: 'database',
    title: 'Data done properly',
    text: 'ETL migrations, secure relational databases, and ACID-compliant records mean your numbers are accurate from day one.',
  },
  {
    icon: 'sparkles',
    title: 'AI that respects your data',
    text: 'We connect ERP data to large language models with orchestration logic that keeps strict access controls in place.',
  },
  {
    icon: 'server',
    title: 'Infrastructure included',
    text: 'The same team can host, secure, back up, and monitor your ERP, so there is one partner accountable for the whole system.',
  },
  {
    icon: 'lifebuoy',
    title: 'With you after launch',
    text: 'We partner with you from development, through deployment, and into dedicated ongoing support.',
  },
];
