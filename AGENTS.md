# AGENTS.md

## Architecture
- `public/` is the publish directory (static site, no build step).
  - `index.html`: page shell. Static copy for hero, About, Contact and footer.
  - `js/data.js`: **single source of truth** for experience, projects, pricing, snapshots, contact links and the watermark text (`window.SITE`).
  - `js/main.js`: renders the data blocks into the page, then handles scroll reveals, count-ups, timeline draw, active nav, mobile menu, lightbox and the visit beacon.
  - `css/style.css`: theme tokens at the top (`:root`). Dark charcoal theme with a single warm gold accent `--gold` (`#c9a96e`); headings in Playfair Display (`--serif`), body in Plus Jakarta Sans. WhatsApp green (`--whatsapp`) is used only on `.btn--whatsapp`. No cyan, pink or decorative gradients.
  - `stats.html`: private stats page (served at `/stats` via a rewrite in `netlify.toml`).
  - `img/`: optimized images. Snapshots in `img/snapshots` have non-listed client shop names blurred into the image itself.
- `netlify/functions/visit.mts`: `POST /api/visit` increments counts in the Blobs store `visitor-stats` (key `counts`).
- `netlify/functions/stats.mts`: `POST /api/stats` returns counts when the body passcode matches the `STATS_PASSCODE` env var.

## Conventions and decisions
- Vanilla JS/CSS only. Animate only `transform`/`opacity`, ease `--ease`, 0.3–0.6s. Everything must respect `prefers-reduced-motion`.
- Reveal stagger is applied in JS (setTimeout per batch) rather than CSS `transition-delay`, so hover transitions are not delayed.
- Watermark is an HTML overlay (`.wm`) sized with container query units (`cqw`), so it scales identically in the grid and the lightbox. Never apply it to the portrait or brand images.
- Mobile menu (`#mobile-menu`) is a dropdown panel shown only at <=720px and toggled via the `hidden` attribute; it must stay closed on load, with no overlay, scroll lock or focus trap. Tablet/desktop use `.nav__links`.
- Images go through `/.netlify/images?url=...&fm=webp`.
- Revenue copy must stay "Reported Monthly Shop Revenue". No invented metrics and no health claims for supplement brands.
- The visit counter stores counts only (no IPs or personal data). Unique visitors use a localStorage flag, falling back to a cookie.
