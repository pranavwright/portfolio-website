# Pranav Wright — Portfolio & CMS Monorepo

> Personal portfolio website and content management system for **Pranav Wright (Pranav P.S.)** — software developer, product builder, web designer, and technology entrepreneur from Kerala, India.

---

## 🏛️ Architecture & Tech Stack

This repository is structured as a clean monorepo:

```
portfolio-website/
├── web/                  # Next.js 14 App Router (Frontend)
│   ├── src/
│   │   ├── app/          # Core pages: Home, /projects, /projects/[slug], /about, not-found, sitemap, robots
│   │   ├── components/   # UI, Layout, Home, Projects, Contact components
│   │   ├── lib/          # Utilities & SEO helpers
│   │   └── sanity/       # Sanity client, image builder, GROQ queries, fetchers, TypeScript types
│   ├── wrangler.toml     # Cloudflare Pages deployment configuration
│   └── package.json
│
├── studio/               # Standalone Sanity Studio v3 (CMS)
│   ├── schemaTypes/      # Content models: project, siteSettings, skill, experience, achievement, currentlyBuilding
│   ├── src/structure.ts  # Desk structure with Singleton pattern for Site Settings
│   ├── scripts/seed.mjs  # Automated initial content seeding script
│   ├── sanity.config.ts  # Studio configuration (Project ID & dataset from environment)
│   └── package.json
│
└── package.json          # Root workspace scripts
```

### Core Technologies

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, end-to-end typed schemas)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a dark charcoal/gold visual design system
- **Motion & Interactions**:
  - **GSAP (`gsap`, `@gsap/react`)**: High-performance SVG system network animation, magnetic physics on interactive buttons (`quickTo`), and smooth scrubbed progressions
  - **Framer Motion (`framer-motion`)**: Component presence transitions, accessible exit animations, and layout morphs
- **Content Management**: [Sanity CMS](https://www.sanity.io/) (Configured via environment variables)
- **Contact Pipeline**: [Formspree](https://formspree.io/) (`@formspree/react`)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) via `@cloudflare/next-on-pages`

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v20.x` or `v22.x`
- npm `v10.x`

### 1. Environment Setup

Create your environment configuration from the provided examples:

```bash
# Frontend Next.js configuration:
cp web/.env.example web/.env.local

# Sanity Studio CMS configuration:
cp studio/.env.example studio/.env.local
```

Configure your environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id
NEXT_PUBLIC_CONTACT_EMAIL=your_email@example.com
```

> **Security Note**: Never expose write tokens or privileged credentials in client-facing (`NEXT_PUBLIC_`) variables, and never commit real `.env` or `.env.local` files to version control.

---

### 2. Running Locally

From the root directory, install dependencies and launch dev servers:

```bash
# Run the Next.js frontend (http://localhost:3000)
npm run dev:web

# Run the Sanity Studio (http://localhost:3333)
npm run dev:studio
```

---

## 📝 Content Management (Sanity Studio)

Open `http://localhost:3333` to manage portfolio content:

1. **Site Settings (Singleton)**: Update your hero headline, short bio, roles, email, social URLs, and default SEO metadata.
2. **Projects**:
   - Add new projects with title, slug, summary, problem/solution, technical architecture, and gallery images.
   - Set **Published At** to make a project public. Leaving it empty preserves it as a draft (never visible on the live site).
   - Toggle **Featured** to highlight a project on the homepage showcase.
   - Reorder cards using the **Sort Order** number.
3. **Currently Building (Now)**: Keep your active initiatives up to date (e.g. *NowMe.live*, *RealSQ*, *CarryKo*) with status tags (*Building*, *Researching*, *Experimenting*).
4. **Skills & Technologies**: Manage your tech stack by categories (Frontend, Backend, Databases, Mobile, Design).
5. **Experience & Timeline**: Add career milestones, exhibition details, and achievements.

### Seeding or Resetting Content

To re-seed the initial verified projects, site settings, and skills into Sanity:

```bash
node studio/scripts/seed.mjs
```

---

## ☁️ Deploying to Cloudflare Pages

The Next.js application is configured for Cloudflare Pages Edge deployment:

```bash
# 1. Build the edge bundle using @cloudflare/next-on-pages
npm run pages:build

# 2. Deploy to Cloudflare Pages
npm run pages:deploy
```

In the Cloudflare Pages dashboard:
- **Build command**: `npx @cloudflare/next-on-pages`
- **Build output directory**: `.vercel/output/static`
- **Compatibility flag**: `nodejs_compat`
- **Compatibility date**: `2024-09-23` or later

---

## 🛡️ Acceptance & Quality Verification

- **Real Sanity Integration**: Connected with live GROQ queries configured through environment variables.
- **Draft Protection**: Unpublished documents and drafts are never served on public routes.
- **Dynamic Project Routes**: Slugs dynamically generate pages at `/projects/[slug]` with custom SEO metadata.
- **Reduced Motion Support**: Automatically respects `prefers-reduced-motion` across both GSAP and Framer Motion.
- **Real Contact Form**: Directly dispatches via Formspree AJAX without fake success mockups.
