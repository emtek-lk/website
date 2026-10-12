// Legal pages. The wording comes from the previous emtek.lk pages (Privacy Policy, Terms of Service, Cookie Policy).
// Sections marked UPDATED describe how THIS site works (hosted on Cloudflare, no Odoo, no Google Fonts, no cookies set by
// the site itself) and replace statements that were true only of the old Odoo-built site. Have your legal adviser review.
//
// Inline links use [text](url). Everything else is plain text.

export type Block = { p: string } | { h3: string } | { ul: string[] } | { contact: true };

export interface LegalSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface LegalDoc {
  slug: 'privacy' | 'terms' | 'cookies';
  title: string;
  seoTitle: string;
  description: string;
  lead: string;
  updated: string;
  /** Machine-readable date for structured data */
  updatedISO: string;
  sections: LegalSection[];
}

export const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  seoTitle: 'Privacy Policy',
  description: 'How EMTEK collects, uses, shares and protects personal information when you visit this website, contact us or use our services.',
  lead: 'How we collect, use, share and protect your personal information.',
  updated: '11 October 2026',
  updatedISO: '2026-10-11',
  sections: [
    {
      id: 's1',
      title: '1. Introduction',
      blocks: [
        { p: 'This Privacy Policy explains how EMTEK (“EMTEK”, “we”, “us”) collects, uses, shares and protects personal information when you visit this website, contact us or use our services.' },
        { p: 'We handle personal data in line with applicable law, including the Personal Data Protection Act, No. 9 of 2022 of Sri Lanka, where it applies. By using this website you acknowledge that you have read this policy.' },
      ],
    },
    {
      id: 's2',
      title: '2. Information We Collect',
      blocks: [
        { h3: 'Information you give us' },
        { p: 'When you contact us, use the chat on this website or ask for a proposal, we collect the details you provide, such as your name, email address, phone number, company name and the content of your message.' }, // UPDATED: adds the chat
        { h3: 'Information collected automatically' },
        { p: 'When you use the website, we and our service providers may collect technical information such as your IP address, browser type, device type, pages viewed, the page that referred you and the date and time of your visit. Some of this is recorded by our hosting provider as the website is delivered, and may involve cookies or similar technologies (see our [Cookie Policy](/cookies)).' },
        { h3: 'Information we handle for clients' },
        { p: 'While delivering services, we may process business data that a client provides or that sits in systems we implement or manage, such as ERP records. We handle that data on the client’s instructions and under our written agreement with them.' },
      ],
    },
    {
      id: 's3',
      title: '3. How We Use Your Information',
      blocks: [
        { p: 'We use personal information to:' },
        {
          ul: [
            'respond to enquiries and prepare proposals',
            'deliver, support and manage our services and client relationships',
            'issue invoices and keep business and accounting records',
            'operate, secure and improve this website',
            'send service-related communications',
            'comply with legal obligations and protect our legal rights',
          ],
        },
        { p: 'We send marketing messages only where the law allows, and you can opt out at any time. We do not sell your personal information.' },
      ],
    },
    {
      id: 's4',
      title: '4. How We Share Information',
      blocks: [
        { p: 'We share personal information only where needed and only with:' },
        {
          ul: [
            'service providers that help us run our website and business, such as our website platform, email and hosting providers, who may use the information only to provide their service to us',
            'professional advisers, such as legal and accounting advisers, under duties of confidentiality',
            'authorities or other parties where the law requires it, or to protect rights, safety or security',
            'a successor organisation, if EMTEK is involved in a merger, acquisition or sale of assets, in which case this policy will continue to apply to your information unless you are told otherwise',
          ],
        },
      ],
    },
    {
      id: 's5',
      title: '5. Data Storage and Security',
      blocks: [
        { p: 'We use reasonable technical and organisational measures to protect personal information, including encrypted connections (HTTPS), access controls and limiting access to people who need it. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.' },
        { p: 'Our service providers may store and process information on servers outside Sri Lanka. Where that happens, we take reasonable steps to make sure the information remains protected.' },
      ],
    },
    {
      id: 's6',
      title: '6. Data Retention',
      blocks: [
        { p: 'We keep personal information only for as long as we need it for the purposes described in this policy. Enquiries are kept for as long as needed to respond and follow up. Client records are kept for the duration of the relationship and afterwards for as long as legal, accounting, tax or contractual requirements apply. When information is no longer needed, we delete or anonymise it.' },
      ],
    },
    {
      id: 's7',
      title: '7. Your Rights',
      blocks: [
        { p: 'Subject to applicable law, you may ask us to:' },
        {
          ul: [
            'confirm whether we hold personal information about you and give you access to it',
            'correct information that is inaccurate or incomplete',
            'delete your information where we no longer have a valid reason to keep it',
            'stop or restrict certain uses, or withdraw a consent you gave us',
          ],
        },
        { p: 'To make a request, email us using the details below. We may need to verify your identity first, and we will respond within a reasonable time. If you are not satisfied with our response, you may complain to the relevant data protection authority in Sri Lanka.' },
      ],
    },
    {
      id: 's8',
      title: '8. Cookies and Tracking',
      blocks: [{ p: 'We use cookies and similar technologies to keep the website working. Our [Cookie Policy](/cookies) lists the types we use and explains how to manage them.' }],
    },
    {
      id: 's9',
      title: '9. Third-Party Services',
      blocks: [
        // UPDATED: the old text said the site was built and hosted on Odoo and loaded Google Fonts
        { p: 'This website is hosted on Cloudflare, which processes technical data such as your IP address in order to deliver and secure the website. Messages you send through our contact form or chat are delivered to us by email through our email provider, Resend. Fonts are served from our own website, so your browser does not request them from a third party.' },
        { p: 'We link to third-party platforms such as Facebook, Instagram, LinkedIn, X, YouTube, GitHub and Google Maps. Those services have their own privacy policies, and we are not responsible for how they handle your information.' },
      ],
    },
    {
      id: 's10',
      title: '10. Children’s Privacy',
      blocks: [{ p: 'Our website and services are intended for businesses and are not directed at anyone under 18. We do not knowingly collect personal information from children. If you believe a child has given us personal information, contact us and we will delete it.' }],
    },
    {
      id: 's11',
      title: '11. Changes to This Policy',
      blocks: [{ p: 'We may update this policy from time to time. The latest version is always on this page with its “Last updated” date. If we make significant changes, we will make that clear on the website.' }],
    },
    {
      id: 's12',
      title: '12. Contact Information',
      blocks: [{ p: 'For questions about this policy or to make a request about your personal information, contact:' }, { contact: true }],
    },
  ],
};

export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  seoTitle: 'Terms of Service',
  description: 'The terms that apply to your use of the EMTEK website and to our ERP, software and managed IT services.',
  lead: 'The terms that apply to this website and to our services.',
  updated: '28 September 2026',
  updatedISO: '2026-09-28',
  sections: [
    {
      id: 's1',
      title: '1. Introduction and Acceptance of Terms',
      blocks: [
        { p: 'These Terms of Service (“Terms”) apply to your use of this website and to our services. “EMTEK”, “we” and “us” refer to EMTEK, and “you” refers to the person or organisation using the website or engaging us.' },
        { p: 'By using this website you agree to these Terms. Where we provide services to you under a written proposal, order form or agreement, that document applies to those services and prevails over these Terms if the two conflict.' },
      ],
    },
    {
      id: 's2',
      title: '2. Services Description',
      blocks: [
        { p: 'EMTEK provides ERP implementation and customisation, custom software and application development, system integration, and managed IT services including cloud, security, network and support services.' },
        { p: 'Descriptions on this website are general information and are not an offer. The scope, deliverables, timeline and fees for any engagement are set out in a written proposal or agreement. Some products may be offered in early access or pre-release form, and their features may change before general release.' },
      ],
    },
    {
      id: 's3',
      title: '3. User Responsibilities',
      blocks: [
        { p: 'When using the website or engaging us, you agree to:' },
        {
          ul: [
            'give accurate and complete information',
            'give us timely access, decisions and feedback that we reasonably need to deliver the services',
            'hold the rights and licences needed for any data, content or third-party software you ask us to work with',
            'keep your account credentials and access details secure',
            'use the website lawfully, and not attempt to gain unauthorised access, introduce malicious code or disrupt the website',
          ],
        },
        { p: 'Unless a managed backup service is included in your agreement, you remain responsible for keeping backups of your own data.' },
      ],
    },
    {
      id: 's4',
      title: '4. Intellectual Property',
      blocks: [
        { p: 'The content of this website, including text, graphics, logos, design and code, belongs to EMTEK or its licensors and may not be copied or reused without our written permission.' },
        { p: 'Unless your agreement says otherwise, once you have paid in full you own the bespoke deliverables we create specifically for you. EMTEK keeps ownership of its pre-existing tools, frameworks, libraries and know-how, and gives you a licence to use them as part of the deliverables. Third-party and open-source components remain subject to their own licences. Software products we license, such as Cortex ERP, are licensed and not sold, under the licence terms that come with them.' },
      ],
    },
    {
      id: 's5',
      title: '5. Payment Terms',
      blocks: [
        { p: 'Where fees apply, they are set out in the proposal, agreement or invoice, together with the currency and payment schedule. Unless stated otherwise:' },
        {
          ul: [
            'taxes are not included in quoted fees',
            'invoices are payable by the due date shown on the invoice',
            'third-party costs such as licences and hosting are charged only where agreed',
            'we may pause work on an engagement while an undisputed invoice is overdue',
          ],
        },
        { p: 'If you dispute an invoice, tell us promptly and in good faith and pay any part that is not disputed. Subscription services continue and renew as described in your agreement.' },
      ],
    },
    {
      id: 's6',
      title: '6. Limitation of Liability',
      blocks: [{ p: 'To the extent permitted by law, EMTEK is not liable for indirect, incidental, special or consequential loss, including loss of profit, revenue, data or goodwill, arising from your use of the website or our services. Nothing in these Terms limits liability that cannot be limited by law.' }],
    },
    {
      id: 's7',
      title: '7. Disclaimer of Warranties',
      blocks: [
        { p: 'This website is provided “as is” and “as available”. We do not guarantee that it will be uninterrupted or error-free, or that the information on it is always complete or current.' },
        { p: 'We perform our services with reasonable skill and care. We cannot guarantee specific business results, and we are not responsible for third-party products or services, including linked websites.' },
      ],
    },
    {
      id: 's8',
      title: '8. Indemnification',
      blocks: [{ p: 'You agree to compensate EMTEK for losses arising from third-party claims that result from your breach of these Terms, your unlawful use of the website or services, or data or content you supplied that infringes a third party’s rights. This does not limit any indemnity we give you in a written agreement.' }],
    },
    {
      id: 's9',
      title: '9. Termination',
      blocks: [
        { p: 'Either party may end an engagement as set out in the applicable agreement or, if it does not say, by written notice. We may suspend or end access to the website for breach of these Terms or for misuse.' },
        { p: 'When an engagement ends, fees for work already performed and for costs already committed remain payable. On request, and subject to legal requirements, we will return or delete your data. Provisions that by their nature should continue, such as those on intellectual property, payment, liability and governing law, remain in effect.' },
      ],
    },
    {
      id: 's10',
      title: '10. Governing Law',
      blocks: [{ p: 'These Terms are governed by the laws of Sri Lanka. If a dispute arises, both parties will first try to resolve it through good-faith discussion. If it cannot be resolved that way, the courts of Sri Lanka have jurisdiction.' }],
    },
    {
      id: 's11',
      title: '11. Changes to Terms',
      blocks: [{ p: 'We may update these Terms from time to time. The latest version is always on this page with its “Last updated” date. Continued use of the website after a change means you accept the updated Terms. Changes do not alter the terms of an existing written agreement unless both parties agree.' }],
    },
    {
      id: 's12',
      title: '12. Contact Information',
      blocks: [{ p: 'For questions about these Terms, contact:' }, { contact: true }],
    },
  ],
};

export const cookies: LegalDoc = {
  slug: 'cookies',
  title: 'Cookie Policy',
  seoTitle: 'Cookie Policy',
  description: 'What cookies and similar technologies the EMTEK website uses, and how you can manage them.',
  lead: 'What this website stores on your device, and how to control it.',
  updated: '11 October 2026',
  updatedISO: '2026-10-11',
  sections: [
    {
      id: 's1',
      title: '1. What Are Cookies',
      blocks: [{ p: 'Cookies are small text files that a website stores on your device when you visit it. They let the site recognise your device and remember information between pages or visits. In this policy, “cookies” also covers similar technologies such as local storage.' }],
    },
    {
      id: 's2',
      title: '2. How We Use Cookies',
      blocks: [{ p: 'We use cookies to keep the website working and secure and to remember your choices. Details of how we handle personal information are in our [Privacy Policy](/privacy).' }],
    },
    {
      id: 's3',
      title: '3. Types of Cookies We Use',
      blocks: [
        // UPDATED: the old text described session and language cookies from the Odoo platform, which this site does not set
        { h3: 'Essential cookies' },
        { p: 'This website does not set cookies of its own. Our hosting provider, Cloudflare, may set strictly necessary cookies to keep the website secure and available. They are needed for the website to work and cannot be switched off in our systems.' },
        { h3: 'Functional storage' },
        { p: 'The chat prompt on this website stores one small item in your browser’s session storage so that we show it only once per visit. It holds no personal information and is deleted when you close the tab.' },
        { h3: 'Advertising cookies' },
        { p: 'We do not use cookies to show you advertising. If that changes, we will update this policy and ask for your consent where the law requires it.' },
      ],
    },
    {
      id: 's4',
      title: '4. Third-Party Cookies',
      blocks: [
        // UPDATED: the old text named Odoo and Google Fonts
        { p: 'Services that help us run the website may set their own cookies, such as our hosting provider, Cloudflare. Our fonts are served from our own website, so they do not involve a request to a third party. These third parties have their own policies, for example the [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/).' },
      ],
    },
    {
      id: 's5',
      title: '5. How to Manage or Disable Cookies',
      blocks: [
        { p: 'You can control cookies through your browser settings, where you can usually see which cookies are stored, delete them, or block them for some or all sites. Guidance on managing cookies in common browsers is available at [aboutcookies.org](https://www.aboutcookies.org).' },
        { p: 'If you block essential cookies, some parts of the website may not work correctly.' },
      ],
    },
    {
      id: 's6',
      title: '6. Changes to This Policy',
      blocks: [{ p: 'We may update this policy from time to time. The latest version is always on this page with its “Last updated” date.' }],
    },
    {
      id: 's7',
      title: '7. Contact Information',
      blocks: [{ p: 'For questions about this policy, contact:' }, { contact: true }],
    },
  ],
};
