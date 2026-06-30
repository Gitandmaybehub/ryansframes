# Ryan Heiart — Sports Photography

A fast, dark-themed portfolio + lead site for **Ryan Heiart**, a sports
photographer in Hanover, NJ. It showcases his work, introduces him, and turns
visitors into bookings — with a photo gallery he can update himself.

Built with **Next.js 16**, **Tailwind CSS v4**, **GSAP** + **Lenis** (smooth
scroll & motion), and an optional **Sanity** dashboard for photos.

---

## ✅ Before you launch — fill these in

Everything you'd want to change lives in one file: **`src/lib/site.ts`**.

| What | Where | Notes |
| --- | --- | --- |
| **Google Voice number** | `phone.display` and `phone.e164` in `src/lib/site.ts` | Currently a placeholder `(973) 555-0123`. `e164` must look like `+19735551234`. Powers the Call / Text buttons. |
| **Website domain** | `url` in `src/lib/site.ts` | Used for SEO and link previews. Set it to your real domain once connected. |
| **Instagram handle** | `instagram` in `src/lib/site.ts` | Already set to `@ryansframes`. |

The 8 starter photos are already built in, so the site looks complete on day one.

---

## 🚀 Run it on your computer

You only need [Node.js](https://nodejs.org) (v20+) installed.

```bash
npm install      # first time only
npm run dev      # start the site
```

Open <http://localhost:3000>. Edit a file and it updates live.

Other commands:

```bash
npm run build    # production build (also checks for errors)
npm run start    # run the production build locally
```

---

## 🖼️ Managing your photos

There are two ways to manage the gallery. **Most people should use Option B** —
it lets Ryan add and remove photos himself from a phone or laptop, no code.

### Option A — quick & code-based (good for the initial set)

1. Drop image files into `src/assets/gallery/`.
2. Add an entry for each in `src/data/gallery.ts` (copy an existing block,
   update the import, `alt`, `caption`, and `sport`).
3. Save. That's it — images are automatically optimized and lazy-loaded.

### Option B — the Sanity dashboard (recommended, no code)

This gives Ryan a friendly website where he uploads photos, picks the sport,
writes a one-line description, drags to reorder, and deletes old ones. The site
updates within a minute. It's **free**.

**One-time setup (≈15 min):**

1. Go to <https://www.sanity.io> and create a free account + a new project.
   Copy the **Project ID** it gives you.
2. Open the `studio/` folder in a terminal and run:
   ```bash
   cd studio
   npm install
   npx sanity login
   ```
3. In `studio/sanity.config.ts`, replace `REPLACE_WITH_PROJECT_ID` with your
   Project ID. Then publish the dashboard:
   ```bash
   npm run deploy
   ```
   This puts the dashboard at **https://ryansframes.sanity.studio** — bookmark it.
4. Tell the website about the project. Create a file named **`.env.local`** in
   the project root (copy `.env.example`) and set:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
   On Vercel, add those same two variables under
   **Settings → Environment Variables**, then redeploy.

**After that, adding photos is easy:**

- Go to **https://ryansframes.sanity.studio** and log in.
- Click **Photos → Create new**, upload the image, write a short description,
  pick the sport (and optionally a team/place), then **Publish**.
- To remove a photo, open it and choose **Delete**. To control order, set the
  optional **Order** number (lower shows first) — otherwise newest shows first.

> The site automatically uses Sanity photos as soon as the Project ID is set.
> Until then (or if Sanity ever has a hiccup), it falls back to the bundled
> starter photos, so the gallery is never empty.

---

## ☁️ Deploy to Vercel + custom domain

1. Push this project to a GitHub repository.
2. Go to <https://vercel.com>, **Add New → Project**, and import the repo.
   Accept the defaults (Vercel detects Next.js) and click **Deploy**.
3. (If using Sanity) add the two `NEXT_PUBLIC_SANITY_*` environment variables,
   then redeploy.
4. **Custom domain:** in Vercel → your project → **Settings → Domains**, add
   `ryansframes.com` (or whatever you bought) and follow the DNS instructions.
   Then update `url` in `src/lib/site.ts` to match.

Every time you push to GitHub, Vercel redeploys automatically.

---

## 🧱 Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, header/footer shell + animated background
    page.tsx              # the homepage (Hero -> featured work -> About/Contact links)
    portfolio/page.tsx    # the full gallery (its own page)
    about/page.tsx        # Ryan's intro (its own page)
    contact/page.tsx      # booking / get-in-touch (its own page)
    globals.css           # dark crimson design tokens & styles
    icon / apple-icon / opengraph-image   # auto-generated favicon & link preview
    sitemap.ts, robots.ts # SEO
  components/
    site-header.tsx       # fixed multi-page nav + mobile menu
    site-footer.tsx
    site-background.tsx   # the animated crimson grid behind everything
    page-header.tsx       # shared masthead for the Portfolio/About/Contact pages
    smooth-scroll.tsx     # Lenis + GSAP (resets scroll on page change)
    sections/             # hero, portfolio-gallery, featured-preview, about, contact
    ui/button.tsx, ui/bg-pattern.tsx
  data/gallery.ts         # the bundled starter photos
  lib/
    site.ts               # all editable site settings
    sanity.ts             # reads photos from Sanity (with safe fallback)
    types.ts, lenis.ts, utils.ts
  assets/                 # the actual image files
studio/                   # the Sanity photo dashboard (Option B)
```

---

## ✨ What's built in

- **Dark, athletic design** — stadium-night palette with a single deep-crimson
  accent, a bold brush-script for headlines and the signature wordmark
  (Yellowtail, the "Committed" look) paired with condensed "varsity" block type
  (Anton + Oswald), over a subtly animated crimson grid background.
- **Separate pages** for Portfolio, About, and Contact — the top-right nav routes
  between them (no more one long scroll).
- **Smooth scrolling & motion** (Lenis + GSAP), with a tasteful hero entrance and
  scroll-reveals. All motion respects the visitor's **reduced-motion** setting.
- **Filterable masonry gallery** by sport, with a full-screen **lightbox**
  (keyboard + swipe + pinch-zoom).
- **Fast & high-quality images** — modern AVIF/WebP, responsive sizes, blur-up
  placeholders, lazy loading.
- **Mobile-first & accessible** — 44px+ touch targets, focus rings, alt text,
  labeled controls, no horizontal scroll.
- **SEO ready** — metadata, sitemap, robots, JSON-LD, and an auto-generated
  social link-preview image.

---

Made for Ryan Heiart · `@ryansframes`
