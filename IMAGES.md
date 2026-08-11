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
| **Alt** | "A grower opening a freshly harvested coconut by hand at a smallholding" |
| **Placeholder label** | "Coconut harvest, by hand" |

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
| **Alt** | "Aerial night view of a container vessel being worked alongside a lit terminal" |
| **Placeholder label** | "Night loading at a container terminal" |

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
| **Alt** | "Semi-husked coconuts heaped after grading, ready for bagging" |
| **Placeholder label** | "Graded coconut, ready for bagging" |

**Intended image:** Hands filling or tying a 12.5 kg mesh bag with semi-husked
coconuts, with stacked filled bags behind. Working shot, not a styled still —
this is the image that proves packing is real. Natural light, portrait crop.

> ⚠️ The current photograph shows **graded coconut, not bagged coconut** — see
> "Still outstanding" under Provenance. It is also reused on `/` in the
> growers-and-suppliers block.

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
- **Alt:** "Biscuit-colour semi-husked coconuts stacked in bulk after grading"
- **Also used on:** `/products/semi-husked-coconut` with `priority` (above the fold)
- **Intended image:** Close, well-lit product shot of semi-husked coconuts at
  biscuit-colour grade, in or beside the 12.5 kg mesh bags they ship in. Must
  read as *real inventory*, not a supermarket coconut. This is the flagship
  product — the single most important image on the site after the hero.

### 6. Textiles, yarn & garments — `product-textiles.jpg`
- **Alt:** "Cones of spun cotton yarn racked in a textile mill"
- **Intended image:** Cones of cotton yarn stacked on a rack, or neatly folded
  finished garments. Clean industrial setting, soft daylight, orderly.

### 7. Leather & footwear — `product-leather.jpg`
- **Alt:** "A craftsman marking out a finished tan leather hide"
- **Intended image:** Finished leather hides with visible grain, ideally beside
  a finished shoe. Rich browns and tans, craft-workshop feel, warm light.

### 8. Plastics & polymers — `product-plastics.jpg`
- **Alt:** "Industrial polymer granules poured out for inspection"
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

## 9–13. Masthead banners & section imagery

Every route except `/` opens with its banner photograph as the **background of
the masthead section**, with the headline, breadcrumb and lede sitting on it.

A navy scrim sits between the photo and the text. It is there for one reason:
over the raw images white text measures **2.0:1 in the nav band** and **3.3:1 in
the headline zone**, against a 4.5:1 AA requirement, with worst-case patches at
1.0:1. The scrim is tuned to the minimum that clears the threshold — composited
against every banner, the worst pixel now sits at **4.68:1**, so it darkens as
little as it can while keeping text readable.

Disable it per route with `<PageHeader scrim={false} />` to show the photograph
raw. Text will fail contrast wherever that image is bright.

| Route | Banner | Why |
|---|---|---|
| `/about` | `grove-dawn.jpg` | The origin story — a working plantation at dawn |
| `/products` | `page-header-bg.jpg` | Generic trade masthead; product shots are in the cards below |
| `/products/semi-husked-coconut` | `grove-dawn.jpg` | Where this crop comes from |
| `/quality` | `desk-documents.jpg` | Documentation and attestation |
| `/packaging` | `containers-aerial.jpg` | Container loading is the page's subject |
| `/global-reach` | `hero-port.jpg` | Ports and lanes |
| `/why-us` | `page-header-bg.jpg` | Trade terms, no more specific subject |
| `/contact` | `contact-city.jpg` | The city we trade from |

No page shows the same photograph twice — banners are assigned around whatever
already appears in each page's body. Override per route with
`<PageHeader image="..." imageAlt="..." />`.

All banners are `priority` — they are above the fold on their route — and the
section sits on `bg-surface-dark`, so the band is navy for the instant before
the image paints rather than flashing white.

**Verified composite contrast (white text, AA = 4.5:1):**

| Route | Nav band worst | Headline zone worst |
|---|---|---|
| `/about`, `/products/semi-husked-coconut` | 5.63:1 | 6.67:1 |
| `/products`, `/why-us` | 5.50:1 | 5.37:1 |
| `/quality` | 7.97:1 | 6.42:1 |
| `/packaging` | 4.68:1 | 4.89:1 |
| `/global-reach` | 6.29:1 | 5.78:1 |
| `/contact` | 10.12:1 | 4.84:1 |

### Section imagery (inside page bodies)

| File | Dimensions | Used on | Treatment |
|---|---|---|---|
| `grove-dawn.jpg` | 2400 × 1000 | `/about`, `/products/semi-husked-coconut` — banner | none |
| `quality-stamp.jpg` | 1200 × 900 | `/quality` — traceability | Rounded card, `shadow-lift`, caption |
| `trade-operations.jpg` | 1400 × 1050 | `/why-us` — operations band | Rounded, gradient + overlaid caption |
| `packing-mesh-bags.jpg` | 960 × 1200 | `/packaging`, `/` suppliers block | Gradient behind the suppliers list |

> The home hero is unchanged and keeps its gradients — it was left out of scope
> deliberately.

---

## Provenance & licence

All photography is sourced from **[Pexels](https://www.pexels.com)** under the
[Pexels License](https://www.pexels.com/license/): free for commercial use, no
attribution required, modification permitted. Each file below has been
centre-cropped and resized by `scripts/fit-images.ps1`; nothing else was altered.

Attribution is not required, but the source ID is recorded so any image can be
traced, re-downloaded at higher resolution, or replaced.

| File | Pexels photo | Shows |
|---|---|---|
| `hero-port.jpg` | [21234960](https://www.pexels.com/photo/21234960/) | Container terminal at dusk, warm lights on water |
| `page-header-bg.jpg` | [35458829](https://www.pexels.com/photo/35458829/) | Harbour crane against low sun — masthead backdrop |
| `containers-aerial.jpg` | [16229885](https://www.pexels.com/photo/16229885/) | Aerial night view of a vessel being worked |
| `story-farm.jpg` | [28625589](https://www.pexels.com/photo/28625589/) | A grower opening a coconut by hand |
| `product-coconut.jpg` | [7543134](https://www.pexels.com/photo/7543134/) | De-husked coconuts stacked in bulk |
| `packing-mesh-bags.jpg` | [5608054](https://www.pexels.com/photo/5608054/) | Semi-husked coconuts heaped after grading |
| `desk-documents.jpg` | [8872719](https://www.pexels.com/photo/8872719/) | Hands with an invoice folder on a wooden desk |
| `quality-stamp.jpg` | [18687845](https://www.pexels.com/photo/18687845/) | Date stamp resting on completed forms |
| `trade-operations.jpg` | [25153797](https://www.pexels.com/photo/25153797/) | Containers lit alongside a vessel at night |
| `contact-city.jpg` | [14845309](https://www.pexels.com/photo/14845309/) | Bengaluru skyline at dusk |
| `product-textiles.jpg` | [7974730](https://www.pexels.com/photo/7974730/) | Cones of spun cotton yarn on a mill rack |
| `product-leather.jpg` | [6653222](https://www.pexels.com/photo/6653222/) | A craftsman marking out a tan leather hide |
| `product-plastics.jpg` | [6331084](https://www.pexels.com/photo/6331084/) | Polymer granules poured out for inspection |
| `grove-dawn.jpg` | [10614494](https://www.pexels.com/photo/10614494/) | Dawn light through a coconut plantation |

### These are stock, and that is a known trade-off

Questionnaire §10.7 warns that "stock images of containers are the fastest way
to look like every other trading company". These were chosen to push against
that — specific, editorial, warm-graded, and matched to the adjacent copy rather
than generic — but they are still stock, and a buyer who reverse-searches will
find them elsewhere.

They are a deliberate interim step up from the generated placeholders. Real
photographs of your own consignments, packing and loading remain the goal, and
every slot swaps in one file operation.

### Alt text describes the sourced image, not the ideal one

Several alt strings were rewritten when these images landed, because the
original wording described photographs we do not have. `product-coconut` no
longer claims "12.5 kg mesh bags" (the shot is bulk-stacked), `product-leather`
no longer claims footwear, and `product-textiles` no longer claims garments.
Restore the fuller descriptions when real photography arrives.

**Still outstanding:** no image on the site shows the 12.5 kg mesh bag the
product actually ships in. Searches for mesh/net sacks returned only consumer
shopping bags, and the jute-sack alternatives all carried other companies'
branding. `/packaging` therefore shows graded coconut rather than bagged
coconut. This is the single most valuable photograph you could supply.

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
