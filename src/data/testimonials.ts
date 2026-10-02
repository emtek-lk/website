import { getClient, type Client } from './clients';

export interface ClientStory {
  person: string;
  role: string;
  company: string;
  /** ISO 3166-1 alpha-2, lower case */
  country: 'lk' | 'gb' | 'in';
  client: Client;
  /** What EMTEK delivered for this client */
  delivered: { label: string; href?: string }[];
  /** Matching case study in src/content/projects/ */
  project: string;
  /**
   * The client's own words. Leave empty until the client has approved a quote:
   * the card then shows what we delivered, and gains a quote block as soon as this is filled in.
   */
  quote?: string;
}

export const countryNames: Record<ClientStory['country'], string> = {
  lk: 'Sri Lanka',
  gb: 'United Kingdom',
  in: 'India',
};

export const clientStories: ClientStory[] = [
  {
    person: 'Anura Suraweeraarachchi',
    role: 'Managing Director',
    company: 'Vanguard Protection (Pvt) Ltd',
    country: 'lk',
    client: getClient('Vanguard_Protection'),
    delivered: [
      { label: 'Cortex ERP', href: '/erp/cortex-erp' },
      { label: 'MetroFix mobile app', href: '/services/custom-software-development' },
      { label: 'Company website' },
    ],
    project: 'vanguard-protection',
  },
  {
    person: 'Adam Woodford',
    role: 'CEO',
    company: 'Smart Equip Ltd',
    country: 'gb',
    client: getClient('Smart_Equip'),
    delivered: [
      { label: 'Odoo implementation', href: '/erp/odoo' },
      { label: 'Custom CRM & marketing web app', href: '/services/custom-software-development' },
    ],
    project: 'smart-equip',
  },
  {
    person: 'Sreenath Aravind',
    role: 'Director',
    company: 'Daikin Air Conditioning India (Pvt) Ltd',
    country: 'in',
    client: getClient('Daikin_Air'),
    delivered: [
      { label: 'Microsoft Dynamics 365', href: '/erp/microsoft-dynamics-365' },
      { label: 'Managed cloud for BI', href: '/services/managed-it-services' },
    ],
    project: 'daikin-india',
  },
];
