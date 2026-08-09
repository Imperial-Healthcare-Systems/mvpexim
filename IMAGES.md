# Image Manifest — MVP Exim

Every photographic slot on the site, with the exact path, dimensions and alt
text already wired up in code.

## How to swap in a real image

1. Generate or shoot the image at the **exact pixel dimensions** listed below.
2. Save it to the **file path** listed, overwriting the placeholder.
3. Done. No code change, no import, no config edit, no rebuild of any component.

Every slot renders through `components/primitives/placeholder-image.tsx`, which
paints an on-brand placeholder and lays the file at that path on top. If the
file is missing or fails to load, the placeholder stays visible with its label
instead of a broken-image icon — so a half-finished image set never looks
broken.

**Format:** PNG or JPG at the stated path. To use WebP/AVIF instead, keep the
`.png` filename — Next.js re-encodes to AVIF/WebP at request time regardless of
source format (`next.config.mjs` → `images.formats`). Do not rename files.

**Dimensions:** the numbers below are the intended source resolution and also
drive each slot's `aspect-ratio` box, so the space is reserved before load and
nothing shifts. Supply at least the stated size; larger is fine (Next
downscales), smaller will look soft.

**Alt text** is already written for the *intended* photograph, not the
placeholder. If the real image differs materially from the description, update
the `alt` prop at the listed source location.

---

## 1. Home hero

| | |
|---|---|
| **File** | `public/images/hero-port.png` |
| **Dimensions** | 2400 × 1600 (3:2) |
| **Used on** | `/` — full-bleed hero background |
| **Source** | `components/sections/home-hero.tsx` |
| **Loading** | `priority` — this is the LCP element, preloaded with `fetchpriority="high"` |
| **Alt** | *Decorative* (`alt=""`) — the headline carries the meaning, so the image is hidden from screen readers |

**Intended image:** Golden-hour wide shot of an Indian container port — cargo
being loaded onto a container ship, gantry cranes in the middle distance. Warm,
optimistic, cinematic. Left third must stay visually calm and darker: the
headline sits there. Landscape, horizon low.

> ⚠️ The intake questionnaire's design section warns that "container ships at
> sunset" is the single most clichéd image in trade marketing. Question 11's
> "what you actively dislike" row was left blank, so this is unconfirmed — worth
> asking the client before committing to this shot.

---

## 2. Story / farm

| | |
|---|---|
| **File** | `public/images/story-farm.png` |
| **Dimensions** | 1200 × 1500 (4:5 portrait) |
| **Used on** | `/` (story teaser), `/about` (story column) |
| **Source** | `app/page.tsx`, `app/about/page.tsx` |
| **Loading** | lazy |
| **Alt** | "Growers sorting freshly harvested coconuts at a farm near Pollachi, Tamil Nadu" |
| **Placeholder label** | "Coconut sorting at a Pollachi farm" |

**Intended image:** Documentary-style portrait shot of growers hand-sorting
freshly harvested coconuts outdoors. Natural daylight, real hands and real
produce, no studio staging. Warm greens and browns. This is the human-story
image — people, not product.

---

## 3. Founder / documentation

| | |
|---|---|
| **File** | `public/images/desk-documents.png` |
| **Dimensions** | 1200 × 900 (4:3) |
| **Used on** | `/about` — founder section |
| **Source** | `app/about/page.tsx` |
| **Loading** | lazy |
| **Alt** | "Nikhil, founder of MVP Exim, reviewing export documentation and shipping paperwork at his desk" |
| **Placeholder label** | "Founder portrait / export documentation" |

**Intended image:** Ideally a real photograph of Nikhil at work with export
paperwork — bill of lading, packing list, phytosanitary certificate. Calm,
considered, professional; natural window light. If no founder photograph is
available, an over-the-shoulder shot of hands and documents works and avoids a
stock-portrait look.

> The questionnaire's appendix requests "founder and team photographs, plus
> short bios" and records photographs as **N/A** so far. The bio is written; the
> photograph is outstanding.

---

## 4. Container yard

| | |
|---|---|
| **File** | `public/images/containers-aerial.png` |
| **Dimensions** | 2400 × 900 (8:3 panoramic) |
| **Used on** | `/global-reach` — full-width band below the ports grid |
| **Source** | `app/global-reach/page.tsx` |
| **Loading** | lazy |
| **Alt** | "Aerial view of a shipping container yard at an Indian port, with stacked containers and gantry cranes" |
| **Placeholder label** | "Container yard at an Indian port" |

**Intended image:** High aerial / drone view straight down or at a steep angle
over stacked containers. Graphic, grid-like, almost abstract. Cool daylight.
Wide panoramic crop — do not supply a square image, it will crop badly.

---

## 5–8. Product images

All four use the same treatment: 4:3, lazy-loaded, shown in the product card
grid on `/` and `/products`. The coconut image additionally appears at larger
size on its detail page.

| Product | File | Dimensions |
|---|---|---|
| Semi-husked coconut | `public/images/product-coconut.png` | 1200 × 900 |
| Textiles, yarn & garments | `public/images/product-textiles.png` | 1200 × 900 |
| Leather & footwear | `public/images/product-leather.png` | 1200 × 900 |
| Plastics & polymers | `public/images/product-plastics.png` | 1200 × 900 |

**Source of alt text and labels:** `lib/site-data.ts` → `products[].imageAlt`
and `products[].imageLabel`. Change them there, in one place, and every usage
updates.

### 5. Semi-husked coconut — `product-coconut.png`
- **Alt:** "Semi-husked coconuts in biscuit-colour grade, stacked in 12.5 kg mesh bags ready for container loading"
- **Also used on:** `/products/semi-husked-coconut` with `priority` (above the fold)
- **Intended image:** Close, well-lit product shot of semi-husked coconuts at
  biscuit-colour grade, in or beside the 12.5 kg mesh bags they ship in. Must
  read as *real inventory*, not a supermarket coconut. This is the flagship
  product — the single most important image on the site after the hero.

### 6. Textiles, yarn & garments — `product-textiles.png`
- **Alt:** "Rolls of cotton yarn and folded finished garments in an Indian textile facility"
- **Intended image:** Cones of cotton yarn stacked on a rack, or neatly folded
  finished garments. Clean industrial setting, soft daylight, orderly.

### 7. Leather & footwear — `product-leather.png`
- **Alt:** "Finished leather hides and manufactured footwear at an Indian tannery workshop"
- **Intended image:** Finished leather hides with visible grain, ideally beside
  a finished shoe. Rich browns and tans, craft-workshop feel, warm light.

### 8. Plastics & polymers — `product-plastics.png`
- **Alt:** "Industrial polymer granules in bulk sacks at a plastics processing plant"
- **Intended image:** Polymer granules close up — pouring, in a scoop, or in
  open bulk sacks. Clean, technical, neutral colour. The most industrial image
  in the set; keep it cool-toned against the warm agricultural ones.

---

## Non-photographic assets (do not regenerate)

These are real brand assets, not placeholders.

| File | Dimensions | Purpose |
|---|---|---|
| `public/logo/mvp-horizontal-dark.png` | 382 × 144 | Full-colour lockup — header solid state |
| `public/logo/mvp-horizontal-light.png` | 382 × 144 | Reversed white lockup — header transparent state, footer |
| `public/logo/mvp-horizontal.png` | 7096 × 3548 | Original client master (white background, unused at runtime) |
| `public/logo/mvp-icon.png` | 5016 × 5016 | Original icon master (currently unused) |
| `public/icon.svg`, `icon-light-32x32.png`, `icon-dark-32x32.png`, `apple-icon.png` | — | Favicons |

Both header lockups are derived from `mvp-horizontal.png` — cropped to the ink
bounds, keyed from white to true transparency, and downscaled (616 KB → 41 KB
combined). Regenerate them only if the master logo changes.

---

## Still missing

No Open Graph share image exists. Social previews currently fall back to text
only. A 1200 × 630 image at `app/opengraph-image.png` would be picked up
automatically by the App Router — worth adding before launch.
