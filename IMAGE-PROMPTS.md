# Image Prompts — MVP Exim

Copy-paste prompts for ChatGPT (GPT-4o / DALL·E) to fill every image slot on the
site. Pair this with `IMAGES.md`, which lists where each file is used.

## How to use

1. Paste the **Style preamble** below, then one image prompt, into ChatGPT.
2. Ask for the **size** listed with that prompt (ChatGPT only produces
   1024×1024, 1024×1536 or 1536×1024 — none of the site's slots match those, so
   never try to request the final dimensions directly).
3. Download the result and rename it to the **filename** given.
4. Drop all your files into a folder called `incoming/` in the project root.
5. Run:

   ```
   powershell -ExecutionPolicy Bypass -File scripts/fit-images.ps1
   ```

   That centre-crops each file to the correct aspect ratio, resizes it to the
   exact pixel dimensions the site expects, and writes it into
   `public/images/`. No code changes, no manual cropping.

---

## ⚠️ Read before generating

**These are placeholders, not documentation.** An AI image of a farm or a
container yard is not a photograph of MVP Exim's actual operations. That matters
more than usual for an exporter: a buyer looking at a "warehouse" photo
reasonably assumes you have a warehouse, and the questionnaire records that you
have none. Everything here is composed to show *the commodity and the trade*,
not to imply facilities or scale you don't have.

**Do not generate a photo of Nikhil.** The founder slot is deliberately written
as hands-and-paperwork with no identifiable face. Generating a synthetic person
and captioning them as a real named founder is fabricating someone's likeness —
and it's the one image on the site a buyer might later match against a LinkedIn
profile. Replace that slot with a real photograph when you have one.

**Replace these with real photography when you can.** §10.7 of your
questionnaire warns that stock-looking imagery is the fastest way to look like
every other trading company. The prompts below push hard toward documentary
realism for that reason, but real photos of your actual consignments will always
beat them.

---

## Style preamble

Paste this once at the top of each prompt.

> Photorealistic editorial documentary photograph for an Indian export company's
> website. Warm golden natural light, rich earthy colour grade — creams, warm
> browns, harvest gold, with deep navy blue as the only cool tone. Shot on a
> full-frame camera with a prime lens, natural depth of field, slight film
> grain. Grounded and real, like reportage for a trade publication — not glossy
> stock photography, not an advertisement, not CGI. No text, no words, no
> lettering, no logos, no watermarks, no signage of any kind anywhere in the
> image. No people looking at the camera.

---

## 1. Home hero — `hero-port.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 2400×1600

> A wide golden-hour view of a working Indian seaport. A container ship is being
> loaded, gantry cranes stand in the middle distance, stacked shipping
> containers recede toward the horizon. Low sun, long warm light, faint haze in
> the air. The left third of the frame must be visually calm, uncluttered and
> darker — open sky or shadowed water — because large white headline text will
> be placed there. Horizon low in the frame. No people in the foreground.

*Note: the left third really does need to stay quiet — the headline, the stats
row and two buttons all sit over it.*

---

## 2. Story / farm — `story-farm.png`

**Ask ChatGPT for:** 1024×1536 (portrait)
**Final size:** 1200×1500

> Growers hand-sorting freshly harvested coconuts at a small farm in Tamil Nadu,
> southern India. Semi-husked coconuts — the fibrous husk partly removed,
> showing pale biscuit-brown shell — piled on the ground and in woven baskets.
> Two or three workers seen from the side or behind, hands in the work, faces
> not the subject. Dappled daylight through palm fronds, deep greens and warm
> browns. Documentary, unposed, real hands and real produce.

---

## 3. Founder / documentation — `desk-documents.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 1200×900

> Close overhead view of a wooden desk with export shipping paperwork spread
> across it — printed forms, a clipboard, a pen, a pair of reading glasses, a
> cup of tea. A person's hands rest on the documents mid-review; only the hands
> and forearms are visible, no face, no head, no identifiable person. Soft
> window light from the left, warm wood tones, calm and considered. The
> documents must be blank or show only abstract unreadable lines — no legible
> text or numbers anywhere.

*Deliberately faceless — see the warning above.*

---

## 4. Container yard — `containers-aerial.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 2400×900 — a **very wide** band

> A high aerial drone view looking down at a steep angle over a container yard
> at an Indian port. Rows of stacked shipping containers form a strong graphic
> grid — rust reds, deep blues, weathered whites. Clean daylight, long shadows
> between the stacks, almost abstract in its geometry.

*This slot crops to a wide 8:3 letterbox, so roughly the top and bottom quarter
of what ChatGPT gives you is discarded. Ask for the interest to sit in the
middle band of the frame — if the best part is at the very top or bottom, it
will be cropped away.*

---

## 5. Packing into mesh bags — `packing-mesh-bags.png`

**Ask ChatGPT for:** 1024×1536 (portrait)
**Final size:** 1200×1500

> Semi-husked coconuts being packed into open-weave mesh sacks at a packing
> shed in southern India. One sack in the foreground being filled by hand,
> several filled and tied sacks stacked behind it. The coconuts are biscuit-
> brown, uniform in size, with the fibrous husk partly removed. Working shot,
> hands and sacks in focus, no faces. Warm shaded daylight, dust in the air.

---

## 6. Semi-husked coconut — `product-coconut.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 1200×900

> A close product photograph of premium semi-husked coconuts in biscuit-colour
> grade — the fibrous outer husk trimmed back to reveal a clean pale-brown
> shell, uniform in size and quality. Arranged in and beside an open-weave mesh
> sack on a plain warm surface. Shallow depth of field, warm directional light
> raking across the texture of the husk. Reads as real export inventory, not a
> supermarket display or a styled food shot.

*This is the flagship product and the most important image on the site after the
hero — it is worth regenerating a few times to get right.*

---

## 7. Textiles, yarn & garments — `product-textiles.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 1200×900

> Cones of raw cotton yarn stacked on a metal rack in an Indian textile mill,
> with a neat stack of folded finished garments in soft natural tones beside
> them. Clean, orderly, industrial but not cold. Soft daylight from high
> windows, creams and warm neutrals.

---

## 8. Leather & footwear — `product-leather.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 1200×900

> Finished leather hides with visible natural grain, draped and stacked on a
> craftsman's workbench, with one finished leather shoe resting beside them.
> Rich tan and chestnut browns, hand tools just visible at the edge of frame.
> Warm workshop light, craft atmosphere, tactile.

---

## 9. Plastics & polymers — `product-plastics.png`

**Ask ChatGPT for:** 1536×1024 (landscape)
**Final size:** 1200×900

> A close view of industrial polymer granules pouring from a metal scoop into an
> open bulk sack at a processing plant. Small translucent and white pellets,
> catching the light. Clean, technical, precise. Cooler and more neutral in tone
> than the agricultural images, but still lit with warm daylight rather than
> fluorescent.

*Deliberately the most industrial image in the set — it should feel a little
cooler than the coconut and leather shots without breaking the palette.*

---

## If something comes out wrong

| Problem | Fix |
|---|---|
| Text or fake signage appeared | Add: "absolutely no text, letters, numbers or signage anywhere" and regenerate |
| Too glossy / advertising-like | Add: "candid reportage, imperfect, natural, shot on 35mm film" |
| Colours clash with the site | Add: "warm cream, harvest gold and earth brown palette, deep navy as the only cool colour" |
| Hands look wrong | Reframe so hands are partly out of shot, or crop tighter on the product |
| Wrong crop after fitting | Re-generate asking for the subject centred, then re-run the script |

Colour matters more than usual here: §11 of your questionnaire names **"colour
mismatch"** as one of the three things you actively dislike. If an image feels
off against the cream-and-navy site, regenerate rather than accept it.
