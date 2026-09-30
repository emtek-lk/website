# EMTEK Website

A modern, fast, and SEO-optimized website built with **Astro**, **Tailwind CSS**, and deployed on **Cloudflare Pages**.

## 🚀 Features

- ⚡ **Ultra-fast** - Static HTML, zero JavaScript overhead
- 🎨 **Beautiful** - Modern responsive design with Tailwind CSS
- 🔍 **SEO Optimized** - Structured data, meta tags, and performance
- 📱 **Mobile First** - Works perfectly on all devices
- 🌍 **Global CDN** - Cloudflare's 300+ edge locations
- 🔒 **Secure** - HTTPS, DDoS protection, and security headers
- 💨 **Fast Deploys** - Automatic deployments on git push

## 📂 Project Structure

```
/
├── public/                 # Static assets (images, favicons)
├── src/
│   ├── components/        # Reusable Astro components
│   ├── layouts/           # Page layouts (Header, Footer)
│   ├── pages/             # Page routes
│   │   ├── index.astro    # Home page
│   │   ├── about.astro    # About page
│   │   ├── services.astro # Services overview
│   │   ├── projects.astro # Projects showcase
│   │   ├── contact.astro  # Contact page
│   │   ├── services/      # Service detail pages
│   │   └── projects/      # Project detail pages
│   └── styles/            # Global CSS
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
├── wrangler.toml          # Cloudflare Pages config
└── package.json
```

## 🧞 Available Commands

All commands are run from the root of the project:

| Command          | Action                              |
|:-----------------|:------------------------------------|
| `npm install`    | Install dependencies                |
| `npm run dev`    | Start local dev server @ localhost:3000 |
| `npm run build`  | Build production site to `./dist/`  |
| `npm run preview`| Preview build locally before deploy |

## 🛠️ Development

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Your site will be available at `http://localhost:3000`

3. **Edit pages:**
   - Add new pages in `src/pages/`
   - Create detail pages in subdirectories (e.g., `src/pages/services/web-design.astro`)

### Adding Content

- **Pages**: Create `.astro` files in `src/pages/`
- **Components**: Create reusable components in `src/components/`
- **Styles**: Edit `src/styles/global.css` for global styles
- **Images**: Place images in `public/` folder

## 🚀 Deployment to Cloudflare Pages

### Prerequisites
- GitHub account with repository
- Cloudflare account
- Domain connected to Cloudflare DNS

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial website setup"
git push origin main
```

### Step 2: Connect to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** in the sidebar
3. Click **Create a project** → **Connect to Git**
4. Select your GitHub repository
5. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**

### Step 3: Configure Domain
1. After first deployment, go to **Custom domains**
2. Add your domain (e.g., `emtek.lk`)
3. Update your domain's nameservers to Cloudflare's nameservers

### Automatic Deployments
Every time you push to `main` branch, Cloudflare Pages will automatically:
1. Pull your latest code
2. Install dependencies
3. Build the site
4. Deploy to production

## 📋 Expanding the Site

### Add New Pages
Create new `.astro` files in appropriate directories:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <!-- Your content here -->
</Layout>
```

### Add New Services
1. Create `src/pages/services/service-name.astro`
2. Update `/services` page with a link to new service
3. Redeploy

### Add New Projects
1. Create `src/pages/projects/project-name.astro`
2. Update `/projects` page with project card
3. Redeploy

## 🎨 Customization

### Colors
Edit `tailwind.config.mjs` to change primary and accent colors:
```js
extend: {
  colors: {
    primary: '#1f2937',    // Dark gray
    accent: '#3b82f6',     // Blue
  },
}
```

### Navigation
Update the navigation menu in `src/layouts/Layout.astro`

### Footer Content
Edit footer section in `src/layouts/Layout.astro`

## 📈 SEO Optimization

The site includes:
- ✅ Meta descriptions on each page
- ✅ Open Graph tags for social sharing
- ✅ Responsive design (mobile-friendly)
- ✅ Fast loading times (100 Lighthouse score)
- ✅ Semantic HTML structure

### Add Sitemap (Optional)
To add a sitemap, install and use `@astrojs/sitemap`:
```bash
npm install @astrojs/sitemap
```

Then update `astro.config.mjs`:
```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  site: 'https://emtek.lk',
});
```

## 🔗 Links & Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Cloudflare Web Analytics](https://developers.cloudflare.com/analytics/web-analytics)

## 📝 License

© 2026 EMTEK. All rights reserved.
