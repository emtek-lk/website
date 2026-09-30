# EMTEK Website

Marketing site for [emtek.lk](https://emtek.lk), built with Astro and Tailwind CSS v4, and hosted on Cloudflare Pages. Every page is pre-rendered to static HTML, and no JavaScript ships to the browser.

## Commands

| Command                | Action                                          |
| :--------------------- | :---------------------------------------------- |
| `npm install`          | Install dependencies                            |
| `npm run dev`          | Dev server at `http://localhost:4321`           |
| `npm run build`        | Build the production site to `dist/`            |
| `npm run preview`      | Serve the production build locally              |
| `npm run brand:assets` | Regenerate favicons and `og-image.png` from `src/logos/` |

## Where things live

```
src/
├── data/
│   ├── site.ts          # Company name, tagline, email, phone, nav
│   ├── services.ts      # All service content (titles, offerings, tech stack)
│   ├── erp.ts           # ERP platform pages: Cortex, Dynamics 365, Odoo (modules, FAQs, SEO)
│   └── tech.ts          # Technology logo registry and home logo wall
├── content/projects/    # One Markdown file per case study
├── content.config.ts    # Projects schema
├── components/          # Header, Footer, PageHero, CtaBand, Icon
├── layouts/BaseLayout.astro  # <head>, SEO meta, JSON-LD, header/footer
├── logos/               # Source logo files (optimized automatically at build)
├── pages/               # Routes: /, /about, /services, /services/[slug], /projects, /projects/[slug], /contact, 404
└── styles/global.css    # Tailwind + brand palette (@theme)
public/
├── _headers             # Cloudflare security + cache headers
├── _redirects           # www → apex redirect
├── robots.txt
└── favicons, og-image.png
```

## Editing content

- **Contact details and tagline:** edit `src/data/site.ts`. The footer, contact page, and structured data update automatically.
- **Services:** edit `src/data/services.ts`. Each entry generates its own page at `/services/<slug>`, and is added to the nav menu, footer, and listings. To add a service, append an object to the array (and add its slug to your project files where relevant).
- **ERP platform pages:** edit `src/data/erp.ts`. Each platform generates `/erp/<slug>` with its modules, FAQs (as FAQ rich-result data), and SEO title/description. Module icons live in `src/logos/brands/`.
- **Projects:** copy `src/content/projects/_template.md` to a new file such as `acme-erp-rollout.md`, fill in the frontmatter and body, and it appears at `/projects/acme-erp-rollout`. Files starting with `_` are ignored, and `draft: true` hides a project. Cover images go next to the Markdown file (`cover: ./acme.jpg`) and are optimized to WebP at build time.
- **Colors and fonts:** edit the `@theme` block in `src/styles/global.css`. The palette is built around the logo navy (`#1c4d8d`) and sky (`#bde8f5`).

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. Use these build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`. Set the environment variable `NODE_VERSION` to `22`.
4. Under **Custom domains**, add `emtek.lk` and `www.emtek.lk`.
5. Submit `https://emtek.lk/sitemap-index.xml` in Google Search Console.

Every push to `main` then deploys to production, and other branches get preview URLs.

## SEO built in

- A unique title, description, and canonical URL on every page, with clean URLs (`/about`, not `/about/`)
- Open Graph and Twitter card tags with a branded share image
- JSON-LD `Organization` data on every page, plus `Service` and `BreadcrumbList` on service pages
- An auto-generated sitemap and `robots.txt`
- Self-hosted, preloaded Inter font (Latin subset only), WebP logos, and zero client-side JavaScript
