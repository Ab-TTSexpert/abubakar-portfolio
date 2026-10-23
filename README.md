# Abubakar Baloch, TikTok Shop Specialist Portfolio

A one-page portfolio for Abubakar Baloch covering an About section, experience timeline, selected TikTok Shop projects, pricing, Seller Center snapshots (watermarked) and contact details. A private, passcode-protected stats page shows visitor counts.

## Tech
- Static HTML, CSS and vanilla JavaScript (no framework, no animation library) in `public/`
- Netlify Image CDN for resized WebP images
- Netlify Functions + Netlify Blobs for the private visitor counter (`/api/visit`, `/api/stats`)

## Editing content
All job titles, dates, projects, revenue figures, pricing plans and snapshots live in **`public/js/data.js`**. Edit that file and the page re-renders from it. The hero, About and Contact copy is in `public/index.html`.

## Visitor stats
1. In the Netlify dashboard, go to **Project configuration → Environment variables** and add `STATS_PASSCODE` with a passcode of your choice. Then redeploy.
2. Open `/stats` (or click the small "Stats" link in the footer) and enter the passcode.

## Run locally
```bash
npm install
netlify dev
```

## Still to add
- Scale and third pricing plan details (shown as "Details to be added")
- A Star Supplies website link, plus a dedicated booking link if you want one (Book a Consultation currently opens WhatsApp)
