import type { IconName } from '../components/Icon.astro';

export interface Offering {
  id: string;
  title: string;
  /** What the client gets */
  functionality: string;
  /** How EMTEK builds it */
  development: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  /** Page <title> (kept under ~57 characters so the brand suffix fits in search results) */
  seoTitle: string;
  icon: IconName;
  /** One line, used on cards and in meta descriptions */
  summary: string;
  intro: string;
  offerings: Offering[];
  stack: { group: string; items: string[] }[];
  /** Shown on the service page and published as FAQPage structured data */
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'erp-business-solutions',
    title: 'Enterprise Resource Planning (ERP) & Business Solutions',
    shortTitle: 'ERP & Business Solutions',
    seoTitle: 'ERP Solutions: Implementation, Customization & AI',
    icon: 'layers',
    summary:
      'Centralize finance, HR, inventory, and sales with our Cortex ERP or a tailored Dynamics 365, Odoo, SAP, or NetSuite rollout, then put AI to work on your data.',
    intro:
      'We centralize your business operations through our proprietary Cortex ERP, customize the major enterprise platforms around the way you already work, and use AI to process your corporate data intelligently.',
    offerings: [
      {
        id: 'erp-implementation',
        title: 'Proprietary & Third-Party ERP Implementation',
        functionality:
          'A unified dashboard to manage finance, HR, inventory, and sales. We can deploy our own tailored Cortex ERP to save you licensing fees, or adapt a major platform so your team never has to change established workflows to fit generic software.',
        development:
          'Our engineers modify software at the source-code level and build custom functional modules. We write API hooks that link your ERP with the tools you already use, run ETL (Extract, Transform, Load) pipelines to migrate legacy data, and architect secure relational databases with ACID-compliant transaction records.',
      },
      {
        id: 'erp-automation-ai',
        title: 'ERP Automation & Smart Data Processing',
        functionality:
          'Turns a static ERP into a proactive business intelligence tool. Automate complex financial reporting, or let AI work through large volumes of internal data, invoices, and supply chain records in moments.',
        development:
          'We connect your ERP to leading Large Language Models (LLMs), writing orchestration logic that securely feeds enterprise data to AI APIs so the models can reason over real-time information without compromising strict data access controls.',
      },
    ],
    stack: [
      {
        group: 'ERP frameworks',
        items: ['Cortex ERP', 'Microsoft Dynamics 365', 'Odoo', 'SAP S/4HANA', 'Oracle NetSuite', 'Sage Intacct'],
      },
      { group: 'Data & databases', items: ['Microsoft SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Apache Kafka'] },
      { group: 'Integration & AI', items: ['MuleSoft', 'Talend', 'OpenAI API', 'Anthropic API (Claude)'] },
      { group: 'Customization languages', items: ['Python', 'Java', 'C#', 'Node.js'] },
    ],
    faqs: [
      {
        q: 'What does an ERP system do for my business?',
        a: 'An ERP gives you one unified system to manage finance, HR, inventory, and sales, so every department works from the same data instead of separate spreadsheets and tools.',
      },
      {
        q: 'Which ERP platforms do you work with?',
        a: 'Our own Cortex ERP, Microsoft Dynamics 365, Odoo, SAP S/4HANA, Oracle NetSuite, and Sage Intacct. We help you choose the platform that fits your processes and budget.',
      },
      {
        q: 'Can you customize an ERP to fit our existing workflows?',
        a: 'Yes. Our engineers modify ERP software at the source-code level and build custom functional modules, so you don’t have to change established workflows to fit generic software.',
      },
      {
        q: 'Can you migrate data from our current systems?',
        a: 'Yes. We run ETL (Extract, Transform, Load) pipelines to move data from legacy systems into secure relational databases with ACID-compliant transaction records.',
      },
      {
        q: 'How can AI work with our ERP?',
        a: 'We connect your ERP to large language models with orchestration logic that feeds them enterprise data securely, so you can automate financial reporting and analyze invoices and supply chain records without compromising access controls.',
      },
    ],
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Application Engineering & Digital Platforms',
    shortTitle: 'Custom Software & Apps',
    seoTitle: 'Custom Software Development: Web, Mobile & APIs',
    icon: 'code',
    summary:
      'Bespoke web, mobile, desktop, and cloud applications, plus the APIs and microservices that connect them to the rest of your business.',
    intro:
      'We design and build bespoke software for any platform, whether web, mobile, desktop, or cloud, from the ground up around your specific requirements.',
    offerings: [
      {
        id: 'app-development',
        title: 'Cross-Platform & Enterprise App Development',
        functionality:
          'Tailored digital products, from a customer-facing mobile app to a highly secure B2B web portal or a heavy-duty internal desktop tool, that work seamlessly across operating systems.',
        development:
          'We manage the full Software Development Life Cycle (SDLC): UI/UX prototyping, frontend interfaces, and scalable, secure backend services built on robust enterprise frameworks that connect directly to your Windows environments and corporate databases.',
      },
      {
        id: 'api-microservices',
        title: 'API Development & Microservices',
        functionality:
          'Breaks monolithic software apart so your systems can talk to each other. Your new application can instantly push and pull data from your CRM, payment gateways, or newly integrated AI chat assistants.',
        development:
          'Our engineers build RESTful and GraphQL APIs, secure them with OAuth authentication, and deploy them in containerized environments. Cross-platform frameworks let us compile and ship one codebase rapidly across ecosystems.',
      },
    ],
    stack: [
      {
        group: 'Backend & frameworks',
        items: ['.NET', 'C#', 'Node.js', 'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot', 'Go'],
      },
      {
        group: 'Frontend & cross-platform',
        items: ['Flutter', 'React Native', 'React', 'Vue.js', 'Electron'],
      },
      { group: 'Design & version control', items: ['Figma', 'Git', 'GitHub', 'GitLab'] },
    ],
    faqs: [
      {
        q: 'What kinds of software do you build?',
        a: 'Bespoke web, mobile, desktop, and cloud applications, from customer-facing mobile apps and secure B2B web portals to heavy-duty internal desktop tools.',
      },
      {
        q: 'Can you build one app for both iOS and Android?',
        a: 'Yes. We use cross-platform frameworks such as Flutter and React Native, so a single codebase can be compiled and deployed across platforms.',
      },
      {
        q: 'Can a new application connect to our existing systems?',
        a: 'Yes. We build RESTful and GraphQL APIs secured with OAuth, so your new application can push and pull data from your CRM, payment gateways, ERP, or AI chat assistants.',
      },
      {
        q: 'What does your development process look like?',
        a: 'We manage the full software development life cycle: UI/UX prototyping in Figma, frontend and backend development, and deployment in containerized environments.',
      },
      {
        q: 'Do you support the software after launch?',
        a: 'Yes. We partner with you from development, through deployment, and into dedicated ongoing support, including the infrastructure your application runs on.',
      },
    ],
  },
  {
    slug: 'managed-it-services',
    title: 'Managed IT Infrastructure, Security & Cloud Services',
    shortTitle: 'Managed IT, Security & Cloud',
    seoTitle: 'Managed IT Services: Cloud, Cybersecurity & Support',
    icon: 'server',
    summary:
      'Cloud migration, server and OS management, cybersecurity, backup and disaster recovery, networking, and help desk support that keeps your business online.',
    intro:
      'We are the IT backbone behind your business, keeping your servers, operating systems, and office networks online, secure, and fully supported.',
    offerings: [
      {
        id: 'cloud-infrastructure',
        title: 'Cloud Migration, Infrastructure & OS Management',
        functionality:
          'Moves your on-premise hardware to the cloud for scalable computing power, while we manage the operating systems and servers that keep your applications running smoothly.',
        development:
          'Our system administrators architect cloud environments with Infrastructure as Code (IaC). We configure kernels, manage enterprise servers, set up load balancers, script routine maintenance, and run containerized applications for dependable uptime.',
      },
      {
        id: 'cybersecurity-backup',
        title: 'Cybersecurity, Backup & Disaster Recovery',
        functionality:
          'Protects your intellectual property from breaches, monitors your network for suspicious activity, and makes sure operations can be restored quickly after ransomware or hardware failure.',
        development:
          'We deploy next-generation firewalls, endpoint protection, and VPNs, automate encrypted off-site backups, build failover networks, and run routine disaster recovery stress tests.',
      },
      {
        id: 'network-help-desk',
        title: 'Network Administration & Help Desk Support',
        functionality:
          'Secure, fast Wi-Fi and LAN connectivity for your offices, and a reliable IT support lifeline (ITSM) for employees facing day-to-day software or hardware issues.',
        development:
          'We configure routers, switches, and subnets, and deploy enterprise ticketing software with structured triage workflows and remote-desktop support.',
      },
    ],
    stack: [
      {
        group: 'Operating systems & cloud',
        items: ['Ubuntu', 'Red Hat Enterprise Linux', 'CentOS', 'Windows Server', 'AWS', 'Google Cloud', 'Microsoft Azure'],
      },
      { group: 'DevOps & infrastructure', items: ['Docker', 'Kubernetes', 'Terraform'] },
      { group: 'Cybersecurity & backup', items: ['CrowdStrike', 'Splunk', 'Veeam', 'OpenVPN'] },
      { group: 'Network & ITSM', items: ['ServiceNow', 'Jira Service Management', 'Datadog', 'Cisco Meraki'] },
    ],
    faqs: [
      {
        q: 'What do your managed IT services include?',
        a: 'Cloud migration and server management, cybersecurity, backup and disaster recovery, office network administration, and help desk support for your employees.',
      },
      {
        q: 'Can you move our servers to the cloud?',
        a: 'Yes. We migrate on-premise systems to AWS, Microsoft Azure, or Google Cloud, using Infrastructure as Code with tools such as Terraform for repeatable, well-documented environments.',
      },
      {
        q: 'How do you protect our business from ransomware and breaches?',
        a: 'We deploy next-generation firewalls, endpoint protection, and VPNs, monitor for suspicious activity, automate encrypted off-site backups, and run routine disaster recovery tests.',
      },
      {
        q: 'Do you provide help desk support for our staff?',
        a: 'Yes. We run enterprise ticketing with structured triage workflows and remote-desktop support, so your employees have a reliable lifeline for software and hardware issues.',
      },
      {
        q: 'Can you set up and manage our office network?',
        a: 'Yes. We configure routers, switches, and subnets to give your offices secure, fast Wi-Fi and LAN connectivity, and we keep them maintained.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
