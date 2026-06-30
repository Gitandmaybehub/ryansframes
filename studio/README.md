# Ryan Heiart — Photo Studio (Sanity)

This folder is the **photo dashboard**. Once it's set up, Ryan logs in and
adds / removes / reorders gallery photos — no code, no developer needed.

> Full step-by-step setup (with screenshots-worth of detail) lives in the main
> project **README → "Managing your photos."** Quick version below.

## One-time setup

1. Create a free account + project at <https://www.sanity.io>.
2. In `sanity.config.ts`, replace `REPLACE_WITH_PROJECT_ID` with your Project ID
   (or set the `SANITY_STUDIO_PROJECT_ID` environment variable).
3. From this `studio/` folder:
   ```bash
   npm install
   npx sanity login
   npm run deploy      # publishes the dashboard to https://ryansframes.sanity.studio
   ```
4. Put the same Project ID into the website's environment variables
   (`NEXT_PUBLIC_SANITY_PROJECT_ID`) on Vercel, and redeploy. Done — the site now
   shows the photos from this dashboard.

## Day-to-day

- `npm run dev` — open the dashboard locally at <http://localhost:3333>
- Or just visit **https://ryansframes.sanity.studio** after deploying.

Add a photo → upload the image, write a short description, pick the sport,
optionally add a team/place. Save. It appears on the site within a minute.
