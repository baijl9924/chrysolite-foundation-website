# Chrysolite Empowerment and Education Foundation — website

A static website for **Chrysolite Empowerment and Education Foundation**, a CAC-registered
non-profit based in Ibadan, Oyo State, Nigeria.

- **Motto:** Live • Love • Empower
- **Registration:** CAC Incorporated Trustees · **IT/7008093**
- **TIN:** 2620089007465
- **Incorporated:** 8 June 2023 under CAMA 2020 · founded 2019
- **Address:** Juli Alice Hall, Cilareta Filling Station, Oluyole Estate Road, Oluyole, Ibadan, Oyo State
- **Phone:** +234 80 67 35 95 96
- **Email:** info@chrysolitefoundation.ng

No build step, no framework, no npm. Open `index.html` and it works. This means it can be
hosted anywhere — GitHub Pages, Cloudflare Pages, Netlify, or plain shared hosting.

---

## 1. Where this came from (please read)

This site is **not written from scratch**. It is an adaptation of an open-source Bootstrap 5
template:

| | |
|---|---|
| Template | **HelpChildren** — free Bootstrap 5 HTML template for nonprofits |
| Author | TemplatesJungle |
| Source | https://templatesjungle.com/downloads/help-children-free-bootstrap-5-html-nonprofit-template/ |
| Framework | Bootstrap 5.1.3 |

**Licence condition you must keep:** the template is free to use and modify, but it requires the
footer credit link to TemplatesJungle. That credit is present in the footer of every page:

```html
<p class="mb-2">Free HTML template by <a href="https://templatesjungle.com/" class="link-primary"
   target="_blank" rel="noopener">TemplatesJungle</a></p>
```

**Do not delete it.** Removing it would breach the template's terms. If you want a credit-free
footer, buy a commercial licence from TemplatesJungle or commission a bespoke design.

### What was changed from the template

- All brand colours replaced with the Chrysolite palette (see §2)
- All template copy replaced with content based on the foundation's real programmes
- Custom brand layer appended to `style.css` (components the template did not have)
- New SVG brand assets: logo mark, hero background, CTA background, social share card, photo placeholders
- New `js/chrysolite.js` for donation amounts, form handling and anchor offsets
- Pages restructured: 8 pages instead of the template's original set
- Removed unused template pages (`blog.html`, `contact.php`, `styles.html`, `readme.txt`, etc.)

---

## 2. Brand palette

Defined once as CSS custom properties at the top of `style.css`:

```css
:root {
  --accent-color:      #8FBF3F;  /* peridot green — "chrysolite" is the gemstone peridot */
  --secondary-color:   #E4EFD5;  /* pale peridot tint */
  --dark-color:        #12341F;  /* forest green — headings, dark sections */
  --grey-color:        #E4EFD5;
  --body-text-color:   #5E6B58;
  --light-text-color:  #8A9683;
  --link-color:        #12341F;
}
```

To re-theme the whole site, change these seven values. Everything else follows.
There is also a gold accent `#E0A72C` used sparingly in the logo and social card.

---

## 3. File structure

```
.
├── index.html              Home — hero, problem, numbers, programs, shop, stories, donate
├── about.html              Story, mission/vision/motto, values, governance, team
├── programs.html           Ray of Hope, Skill Empowerment, Back to School, Beyond the Borders
├── shop.html               What trainees make + the self-funding loop
├── stories.html            News listing + newsletter signup
├── single-post.html        Article template — duplicate this per story
├── get-involved.html       Donate, volunteer, partner, FAQ
├── contact.html            Contact details, message form, support request guide, map
├── style.css               Template stylesheet + Chrysolite brand & component layers
├── style.css.bak           Backup of the stylesheet before colour replacement
├── favicon.svg             Gem favicon
├── robots.txt              Crawler rules
├── sitemap.xml             Sitemap — update if you add or rename pages
├── css/vendor.css          Template vendor styles
├── fonts/                  Template fonts
├── images/
│   ├── logo-mark.svg           Hexagonal peridot gem logo
│   ├── hero-bg.svg             Dark forest hero background
│   ├── cta-bg.svg              CTA band background
│   ├── og-cover.svg            1200×630 social share card
│   └── story-placeholder-1..5.svg   Branded photo placeholders — replace these
├── js/
│   ├── chrysolite.js       Site behaviour (donations, forms, year, anchor offset)
│   ├── script.js           Template behaviour (lightbox, parallax, scroll nav)
│   └── …                   jQuery, Bootstrap bundle, Modernizr, plugins
├── plugins/bootstrap-5.1.3/
├── _draft-custom/          Earlier hand-written draft — safe to delete
└── _oss-preview/           Template comparison previews — safe to delete
```

**Before publishing**, delete `_draft-custom/` and `_oss-preview/`. They are working folders,
not part of the site, and they are excluded in `robots.txt` but should still be removed.

---

## 4. How to edit the content

Everything is plain HTML. Open a file in any text editor and change the text between the tags.

### Change the phone number, email or address
It appears in the footer of all 8 pages. Find and replace across all files:

```bash
# example: change the phone number everywhere
sed -i 's/+2348067359596/+2348000000000/g; s/+234 80 67 35 95 96/+234 80 00 00 00 00/g' *.html
```

Also update the structured data (`application/ld+json`) in `index.html` and `contact.html`,
and the `telephone` / `email` values there.

### Add a story
1. Copy `single-post.html` to a new file, e.g. `stories-ray-of-hope-5.html`
2. Replace the title, meta description, canonical URL, body text and image
3. Open `stories.html` and add a new tile in the listing, pointing at the new file
4. Add the URL to `sitemap.xml`

### Replace the placeholder images
The five `story-placeholder-*.svg` files are branded stand-ins, not real photographs.
Replace them with real photos from your events:

1. Crop photos to roughly **800 × 500** (the placeholders' ratio is 8:5)
2. Save as `.jpg` at ~80% quality to keep the page fast
3. Put them in `images/`
4. Update the `src` in the relevant HTML files

The placeholders are referenced in `index.html`, `about.html`, `shop.html`, `stories.html`,
`single-post.html` and `contact.html`. Search for `story-placeholder` to find every use.

Also replace `images/og-cover.svg` — or add a real photo as `images/og-cover.jpg` and update
the `og:image` meta tag on each page. A real photo makes shared links far more effective.

### Update the amounts in the donation section
The "what your gift goes towards" table in `get-involved.html` uses indicative figures.
Adjust them to match your real costs, and keep the honesty note beneath the table.

---

## 5. Connecting the forms ⚠️

**The forms do not send anywhere yet.** They are front-end only — submitting one shows a
thank-you message and clears the fields, but no email is sent.

This is deliberate: it means the site works offline and does not silently drop enquiries.
You must connect them before going live.

There are three forms:

| Page | Form |
|---|---|
| `get-involved.html` | Volunteer sign-up |
| `get-involved.html` | Partnership enquiry |
| `stories.html` | Newsletter signup |
| `contact.html` | Main contact / support request |

All of them carry the attribute `data-demo-form`. To connect them, pick one option:

### Option A — Formspree (easiest, free tier available)
1. Create an account at https://formspree.io and a new form
2. Copy your form endpoint, e.g. `https://formspree.io/f/abcdwxyz`
3. In each `<form>` tag, replace `data-demo-form` with:
   ```html
   action="https://formspree.io/f/abcdwxyz" method="POST"
   ```
4. In `js/chrysolite.js`, delete the block that intercepts `form[data-demo-form]`
   (section 2, "Forms") so the browser submits normally
5. Keep the `<input name="...">` attributes — Formspree uses them as field labels

### Option B — Netlify Forms (free, if you host on Netlify)
Add `netlify` and a name to each form:

```html
<form name="volunteer" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="volunteer">
  …
</form>
```

Then remove the interception block in `js/chrysolite.js` as above.

### Option C — Your own endpoint
Point `action` at your script and set `method="POST"`. If you keep the AJAX behaviour, edit
the submit handler in `js/chrysolite.js` to `fetch()` your endpoint instead of just showing
the message.

### Option D — Google Forms / Tally / a mailto: link
Simplest of all: replace each form with a button linking to an external form, or a
`mailto:` link. Less polished, zero setup.

> After connecting, **test every form** with a real submission and confirm the email arrives —
> including in the spam folder.

---

## 6. The donation link

Donations go through Flutterwave. The link lives in `index.html` and `get-involved.html`:

```html
<a id="donateLink"
   data-base="https://flutterwave.com/donate/ayjdhsqasnkl"
   href="https://flutterwave.com/donate/ayjdhsqasnkl?amount=5000&amp;currency=NGN"
   target="_blank" rel="noopener noreferrer">
```

The amount chips (₦1,000 / ₦5,000 / ₦25,000 / ₦100,000) and the custom amount field rewrite
the `?amount=` parameter via `js/chrysolite.js`. To change the destination, replace the
`data-base` value **and** the `href` on both pages.

Verify the Flutterwave page is still live and points at the correct account before publishing.

---

## 7. The shop link

The shop button points at the Selar store:

```
https://selar.com/m/chrysolite-foundation1
```

Used in `shop.html` (the "Open our store" callout), the footer of every page, and
`index.html`. If the store URL changes, update it everywhere:

```bash
grep -rl "selar.com/m/chrysolite-foundation1" . | xargs sed -i 's|https://selar.com/m/chrysolite-foundation1|https://selar.com/m/NEW-SLUG|g'
```

Once the store has individual product pages, link each product tile in `shop.html` directly
to its own page instead of all of them pointing at the store root.

---

## 8. Previewing locally

No server needed — just open `index.html` in a browser. But a local server is better because
some browsers block local file requests:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

---

## 9. Deploying

### GitHub Pages (free)
```bash
git init
git add .
git commit -m "Chrysolite Foundation website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Then: repository **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
The site appears at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Cloudflare Pages (free, faster in Nigeria, custom domain support)
1. Push the repo to GitHub (above)
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
3. Pick the repo. Build command: **leave empty**. Output directory: **`/`**
4. Deploy. Then add the custom domain under **Custom domains**

### Custom domain
Once `chrysolitefoundation.ng` is registered and pointed at your host, also update:
- the `canonical` link and `og:url` / `og:image` on every page
- the `Sitemap:` line in `robots.txt`
- the `<loc>` entries in `sitemap.xml`

> **Note:** the domains `chrysolitefoundation.ng` and `thechrysolitefoundation.org` were both
> unreachable when this site was built. Confirm which domain the foundation actually owns
> before publishing, and update the canonical URLs to match. The current values are
> placeholders.

---

## 10. Before you go live — checklist

- [ ] Delete `_draft-custom/` and `_oss-preview/`
- [ ] Connect all four forms and test each one end to end (§5)
- [ ] Confirm the Flutterwave donation link works and pays the right account (§6)
- [ ] Confirm the Selar shop link works (§7)
- [ ] Replace the five placeholder images with real photographs (§4)
- [ ] Replace `og-cover.svg` with a real photo for social sharing
- [ ] Confirm the real domain and update canonical URLs, `robots.txt`, `sitemap.xml` (§9)
- [ ] Verify the TemplatesJungle footer credit is still present on all 8 pages (§1)
- [ ] Test on a phone — most visitors will arrive on mobile
- [ ] Check the address, phone and email are correct in the footer of all pages

---

## 11. Content sources

Facts on this site come from the foundation's own public records and activity, not from
assumptions. Where a number is an estimate rather than a verified figure, the page says so.

| Claim | Source |
|---|---|
| 18.3M out-of-school children; 10.2M primary, 8.1M secondary; 7.6M girls | UNICEF Nigeria |
| CAC Incorporated Trustees IT/7008093, incorporated 8 June 2023, CAMA 2020 | CAC certificate |
| TIN 2620089007465 | CAC certificate |
| 600+ children and young adults reached since 2019 | Foundation's own reporting |
| Ray of Hope — 4 editions, closing with exhibition / trade fair / awards | Foundation's own activity records |
| 6-week skill programme; crochet, adire, ankara; Isale Osun, Beere Ibadan | Foundation's own activity records |
| Back to School — 3rd edition; ₦1,000 as indicative per-pupil cost | Foundation's own activity records |
| "100% of these sales contribute to future trainings" | Foundation's Selar store |
| Address, phone, social profiles | Foundation's public profiles |

If any figure changes, update it here and on the page that cites it.

---

## 12. Support

Questions about the site itself: whoever built or maintains it.
Questions about the foundation: **info@chrysolitefoundation.ng** · +234 80 67 35 95 96.
