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

**Format:** JPEG at the stated path. Next.js re-encodes to AVIF/WebP at request
time (`next.config.mjs` → `images.formats`), so the source only needs to be a
good-quality JPEG. Do not rename files — the path is what the code references.

**Easiest route:** follow `IMAGE-PROMPTS.md`, drop your downloads in `incoming/`,
and run `scripts/fit-images.ps1`. It crops, resizes and names everything for you.

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
| **File** | `public/images/hero-port.jpg` |
| **Dimensions** | 2400 × 1600 (3:2) |
| **Used on** | `/` — full-bleed hero background |
| **Source** | `components/sections/home-hero.tsx` |
| **Loading** | `priority` — this is the LCP element, preloaded with `fetchpriority="high"` |
| **Alt** | *Decorative* (`alt=""`) — the headline carries the meaning, so the image is hidden from screen readers |

**Intended image:** Golden-hour wide shot of an Indian container port — cargo
being loaded onto a container ship, gantry cranes in the middle distance. Warm,
optimistic, cinematic. Left third must stay visually calm and darker: the
headline sits there. Landscape, horizon low.

> ✅ **Resolved.** The completed questionnaire (§11) names the client's actual
> dislikes as **"broken images, colour mismatch, no story"** — *not* container
> ships at sunset. The current hero direction stands. Brand personality marks
> "warm and agricultural" at 5/5, so favour warm golden light over cold
> industrial blue in the grade.

---

## 2. Story / farm

| | |
|---|---|
| **File** | `public/images/story-farm.jpg` |
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
| **File** | `public/images/desk-documents.jpg` |
| **Dimensions** | 1200 × 900 (4:3) |
| **Used on** | `/about` — founder section |
| **Source** | `app/about/page.tsx` |
| **Loading** | lazy |
| **Alt** | "Export documentation and shipping paperwork under review at a desk" |
| **Placeholder label** | "Export documentation" |

**Intended image:** Ideally a real photograph of Nikhil at work with export
paperwork — bill of lading, packing list, phytosanitary certificate. Calm,
considered, professional; natural window light. If no founder photograph is
available, an over-the-shoulder shot of hands and documents works and avoids a
stock-portrait look.

> ⚠️ **The alt text deliberately does not name Nikhil.** The slot currently
> holds a generated, faceless image, and captioning a synthetic person as a real
> named founder would fabricate their likeness. When a real photograph of Nikhil
> arrives, restore the naming in `app/about/page.tsx`.
>
> The questionnaire appendix requests "founder and team photographs, plus short
> bios" and records photographs as **N/A** so far. The bio is written; the
> photograph is outstanding.

---

## 4. Container yard

| | |
|---|---|
| **File** | `public/images/containers-aerial.jpg` |
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

## 4b. Packing into mesh bags

| | |
|---|---|
| **File** | `public/images/packing-mesh-bags.jpg` |
| **Dimensions** | 1200 × 1500 (4:5 portrait) |
| **Used on** | `/packaging` |
| **Source** | `app/packaging/page.tsx` |
| **Loading** | lazy |
| **Alt** | "Semi-husked coconuts being packed into 12.5 kg mesh bags and stacked for container stuffing" |
| **Placeholder label** | "Packing into 12.5 kg mesh bags" |

**Intended image:** Hands filling or tying a 12.5 kg mesh bag with semi-husked
coconuts, with stacked filled bags behind. Working shot, not a styled still —
this is the image that proves packing is real. Natural light, portrait crop.

> This file does not exist yet — the slot currently shows its placeholder.

---

## 5–8. Product images

All four use the same treatment: 4:3, lazy-loaded, shown in the product card
grid on `/` and `/products`. The coconut image additionally appears at larger
size on its detail page.

| Product | File | Dimensions |
|---|---|---|
| Semi-husked coconut | `public/images/product-coconut.jpg` | 1200 × 900 |
| Textiles, yarn & garments | `public/images/product-textiles.jpg` | 1200 × 900 |
| Leather & footwear | `public/images/product-leather.jpg` | 1200 × 900 |
| Plastics & polymers | `public/images/product-plastics.jpg` | 1200 × 900 |

**Source of alt text and labels:** `lib/site-data.ts` → `products[].imageAlt`
and `products[].imageLabel`. Change them there, in one place, and every usage
updates.

### 5. Semi-husked coconut — `product-coconut.jpg`
- **Alt:** "Semi-husked coconuts in biscuit-colour grade, stacked in 12.5 kg mesh bags ready for container loading"
- **Also used on:** `/products/semi-husked-coconut` with `priority` (above the fold)
- **Intended image:** Close, well-lit product shot of semi-husked coconuts at
  biscuit-colour grade, in or beside the 12.5 kg mesh bags they ship in. Must
  read as *real inventory*, not a supermarket coconut. This is the flagship
  product — the single most important image on the site after the hero.

### 6. Textiles, yarn & garments — `product-textiles.jpg`
- **Alt:** "Rolls of cotton yarn and folded finished garments in an Indian textile facility"
- **Intended image:** Cones of cotton yarn stacked on a rack, or neatly folded
  finished garments. Clean industrial setting, soft daylight, orderly.

### 7. Leather & footwear — `product-leather.jpg`
- **Alt:** "Finished leather hides and manufactured footwear at an Indian tannery workshop"
- **Intended image:** Finished leather hides with visible grain, ideally beside
  a finished shoe. Rich browns and tans, craft-workshop feel, warm light.

### 8. Plastics & polymers — `product-plastics.jpg`
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

## Social share card

| | |
|---|---|
| **File** | `public/og.png` |
| **Dimensions** | 1200 × 630 |
| **Used by** | `og:image` and `twitter:image`, site-wide |
| **Regenerate** | `powershell -File scripts/make-og.ps1` |

Navy card with the reversed lockup, headline, the flagship HS code and the
Incoterms. Deliberately a **static file, not a generated route**: `next/og`
fails to initialise under Next 16 + Turbopack in this project (it throws
"Input buffer contains unsupported image format" with or without an embedded
image), and since the card is identical on every route, runtime generation
bought nothing but a failure mode.

> The headline is set in Georgia, not Fraunces. The brand face is a webfont and
> is not installed locally, so the generator substitutes the nearest traditional
> serif available to GDI+. If you want true Fraunces on the card, produce it in
> a design tool at 1200 × 630 and overwrite `public/og.png` — nothing in the
> code needs to change.

---

## Still missing

**No real photography at all.** The questionnaire records product photography,
facility photography and founder photographs as TBD or N/A, and the appendix
notes photographs have not been sent. Every slot above is either a generated
placeholder or an AI image awaiting replacement.

This matters more than usual here: §11 names **"broken images"** as the client's
first stated dislike, and §10.7 warns that "stock images of containers are the
fastest way to look like every other trading company". The `PlaceholderImage`
component is designed against exactly that failure mode — a missing file shows a
branded placeholder with a label, never a broken-image icon.

When sending photographs, the questionnaire's own file spec applies: minimum
2000px on the long edge, original files, not WhatsApp-forwarded copies.
