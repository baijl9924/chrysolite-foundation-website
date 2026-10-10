# Chrysolite Empowerment and Education Foundation — website

A static website for **Chrysolite Empowerment and Education Foundation**, a CAC-registered
non-profit based in Ibadan, Oyo State, Nigeria.

- **Motto:** Live • Love • Empower
- **Registration:** CAC Incorporated Trustees · **IT/7008093**
- **TIN:** 2620089007465
- **Incorporated:** 8 June 2023 under CAMA 2020 · founded 2019
- **Programme office:** Juli Alice Hall, Cilareta Filling Station, Oluyole Estate Road, Oluyole, Ibadan, Oyo State
- **Registered office (CAC):** NO 1, Oduduwa Road, University of Ibadan, Ibadan
- **Phone:** +234 80 32 60 21 80 · +234 80 67 35 95 96
- **Email:** chrysoliteinfo@gmail.com

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
- New SVG brand assets: logo mark, hero background, CTA background, social share card
- 14 licensed photographs added under `images/photos/` to replace the template's abstract
  SVG placeholders — see §4 and `NOTICE.md`
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
├── favicon.svg             Gem favicon
├── robots.txt              Crawler rules
├── sitemap.xml             Sitemap — update if you add or rename pages
├── NOTICE.md               Attribution and image licensing
├── GOODSTACK.md            How the non-profit registration was verified, with raw evidence
├── css/vendor.css          Template vendor styles
├── fonts/                  Template icon font — not referenced by any page, safe to delete
├── images/
│   ├── photos/                 14 programme photographs (stock — replace with your own)
│   ├── logo-mark.svg           Hexagonal peridot gem logo
│   ├── hero-bg.svg             Dark forest hero background
│   ├── cta-bg.svg              CTA band background
│   ├── og-cover.svg            1200×630 social share card
│   ├── certificate-placeholder.svg   CAC certificate stand-in — replace with a photo
│   └── trustee-placeholder.svg       Trustee portrait stand-in — replace with a photo
├── js/
│   ├── chrysolite.js       Site behaviour (donations, forms, year, anchor offset)
│   ├── script.js           Template behaviour (lightbox, parallax, scroll nav)
│   └── …                   jQuery, Bootstrap bundle, Modernizr, plugins
└── plugins/bootstrap-5.1.3/
```

Working folders (`_draft-custom/`, `_oss-preview/`, `_shots/`, `style.css.bak`) have been moved
out of the repository into `../_workfiles/` and are listed in `.gitignore`. Nothing outside the
tree above is part of the published site.

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

> **Address note.** The site currently shows *Juli Alice Hall, Cilareta Filling Station,
> Oluyole Estate Road, Oluyole, Ibadan* as the street address. The foundation's **CAC
> registration record** (reg. no. 7008093) lists *NO 1, Oduduwa Road, University of Ibadan,
> Ibadan, Oyo*. If these are the programme office and the registered office respectively,
> label them as such on `contact.html` rather than showing only one.

### Add a story
1. Copy `single-post.html` to a new file, e.g. `stories-ray-of-hope-5.html`
2. Replace the title, meta description, canonical URL, body text and image
3. Open `stories.html` and add a new tile in the listing, pointing at the new file
4. Add the URL to `sitemap.xml`

### Replace the photography ⚠️
`images/photos/` holds **14 stock photographs**. They are real, licensed images (Pixabay
Content Licence — free for commercial use, no attribution required) chosen so every layout
reads correctly and no page ships with an empty box. **They are not pictures of Chrysolite
Foundation's programmes.** No caption claims they are, but a visitor will assume they are,
so replace them before the site is presented as the foundation's own record.

There are two ratios in use. Match whichever slot you are filling:

| Ratio | Pixels | Used by | Files |
|---|---|---|---|
| **8:5** landscape | 800 × 500 | shop product tiles, article body images | `shop-fabric`, `shop-bag`, `shop-yarn`, `training-sewing`, `community-group` |
| **3:2** portrait | 853 × 1066 | hero, feature cards, story tiles, portraits | `hero-*`, `laughing-child`, `girl-portrait`, `boy-portrait`, `smiling-girl`, `schoolchildren`, `hero-student` |

The site crops with `object-fit: cover` / `background-size: cover`, so a replacement does not
have to be the exact pixel size — but keep the **orientation** right. Dropping a landscape
photo into a portrait slot will crop away the subject.

**To swap one, overwrite the file with the same name.** No HTML change is needed:

```bash
# example: put a real Ray of Hope 4.0 photo in place of the stock one
cp ~/photos/ray-of-hope-4-group.jpg images/photos/community-group.jpg
```

To find every use of a given photo, search for its filename:

```bash
grep -rn "images/photos/" *.html | sort
```

Then check the result — `_shots`-style tooling is not part of the repo, so eyeball each page
after a swap.

### The two remaining placeholders
`images/certificate-placeholder.svg` and `images/trustee-placeholder.svg` are **deliberately
not photographs**. A stock image of an unrelated certificate, or of unrelated people
presented as trustees, would be actively misleading. Each SVG carries a visible instruction
on the artwork itself so it cannot go live unnoticed. Replace them with:

- a scan or photo of the foundation's **CAC certificate** (IT/7008093)
- real headshots of the trustees, cropped to 4:5

### Replace the social share card
`images/og-cover.svg` is the image shown when a page is shared on WhatsApp, Facebook or X.
An SVG is not supported by most platforms — add a real photo as `images/og-cover.jpg`
(1200 × 630) and update the `og:image` meta tag on all 8 pages. A real photo makes shared
links far more effective than a logo card.

### Update the amounts in the donation section
The "what your gift goes towards" table in `get-involved.html` uses indicative figures.
Adjust them to match your real costs, and keep the honesty note beneath the table.

---

## 5. The forms

There are four forms:

| Page | Form |
|---|---|
| `get-involved.html` | Volunteer sign-up |
| `get-involved.html` | Partnership enquiry |
| `stories.html` | Newsletter signup |
| `contact.html` | Main contact / support request |

**They work as shipped** — no account, no backend. Submitting one opens the visitor's own
email app with the message pre-filled and addressed to `chrysoliteinfo@gmail.com`. Nothing is
silently dropped and no third party sees the data. The trade-offs: the visitor has to press
send, and someone on a webmail-only setup may have no mail app configured.

### Making submissions arrive silently

Set `FORM_ENDPOINT` at the top of `js/chrysolite.js`. That is the only change:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
```

When it is set, each form is POSTed there with `fetch()` and the visitor stays on the page —
the mailto fallback is skipped. If the POST fails, the form tells the visitor to email the
foundation directly rather than pretending it worked.

**Formspree** (free tier, no server needed):
1. Create an account at https://formspree.io and a new form
2. Copy the endpoint, e.g. `https://formspree.io/f/abcdwxyz`
3. Paste it into `FORM_ENDPOINT`
4. Submit each form once and confirm the email arrives — including in the spam folder

**Netlify Forms** (free, if you host on Netlify): add `netlify` and a `name` to each `<form>`
plus a hidden `form-name` input, then point `FORM_ENDPOINT` at a path on your own site (Netlify
intercepts the POST).

**Your own endpoint**: set `FORM_ENDPOINT` to your URL. It must accept a `POST` carrying
`multipart/form-data` and answer with a 2xx status.

> Whichever you choose, **submit every form once on the live site** and confirm the message
> arrives. A form that looks like it worked but sends nothing is worse than no form at all.

### Field names
Each input's `name` attribute is what an endpoint receives. The mailto fallback uses the
visible `<label>` text instead, so the email a visitor sends reads naturally.

### Draft notes
Notes addressed to whoever maintains the site (the "replace this photo" blocks) are hidden by
default so the site can go live exactly as it stands. Append `?draft=1` to any page URL to
reveal them again while you are still filling things in.

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

**Already working — no action needed**

- [x] Donation link — verified live (Flutterwave `ayjdhsqasnkl`, returns the foundation's page)
- [x] Shop link — Selar store
- [x] Forms — deliver by mailto out of the box; set `FORM_ENDPOINT` for silent delivery (§5)
- [x] Contact details — real email plus both phone numbers (§11)
- [x] Draft notes hidden from visitors — append `?draft=1` to see them (§5)

**Needs material from the foundation**

- [ ] The foundation's own photographs, to replace the 14 stock images in `images/photos/` (§4)
- [ ] A photograph of the CAC certificate, to replace `certificate-placeholder.svg`
- [ ] Trustee names, roles and photographs, to replace the four `trustee-placeholder.svg` cards
- [ ] A real photograph for social sharing, to replace `og-cover.svg`
- [ ] Confirmation of two figures on the About page — "600 children since 2019" and the
      donation-tier table — so they can be stated as fact or removed
- [ ] Confirmation of the founding year: the site says 2019 (from LinkedIn), the foundation's
      own former website said "Since 2008"
- [ ] Confirmation of the programme list — the former site named Free Education, Support,
      Empower (discounted ICT training via CISCO), Rural Outreach, Medical Outreaches and
      Skill Empowerment

**Needs a decision or an account**

- [ ] Register `chrysolitefoundation.ng` (currently available) — canonical, `og:url`, `og:image`
      and `sitemap.xml` all become valid at once (§11)
- [ ] Decide how form submissions should be delivered (§5)
- [ ] Only once domain email actually works, move off the Gmail address — not before

**Final checks**

- [ ] Verify the TemplatesJungle footer credit is still present on all 8 pages (§1)
- [ ] Test on a phone — most visitors will arrive on mobile
- [ ] Submit every form once on the live site and confirm the message arrives

---

## 11. Content sources

Facts on this site come from the foundation's own public records and activity, not from
assumptions. The rows marked **unverified** were written as placeholders while the site was
being built and **must be confirmed or removed before launch** — see §10.

| Claim | Source |
|---|---|
| 18.3M out-of-school children; 10.2M primary, 8.1M secondary; 7.6M girls | UNICEF Nigeria — verified |
| CAC Incorporated Trustees IT/7008093, incorporated 8 June 2023, CAMA 2020 | CAC certificate — verified |
| TIN 2620089007465 | CAC certificate — verified |
| "100% of these sales contribute to future trainings" | Foundation's Selar store — verified |
| Email, both phone numbers, Oluyole address | Foundation's own former website, captured 2025-02-24 — verified |
| CAC registration recognised by Goodstack (unclaimed) | Goodstack organisation record — verified |
| 600+ children and young adults reached since 2019 | **unverified — awaiting confirmation** |
| Ray of Hope — 4 editions, closing with exhibition / trade fair / awards | **unverified — awaiting confirmation** |
| 6-week skill programme; crochet, adire, ankara; Isale Osun, Beere Ibadan | **unverified — awaiting confirmation** |
| Back to School — 3rd edition; ₦1,000 as indicative per-pupil cost | **unverified — awaiting confirmation** |
| Donation tiers ₦1,000 / ₦5,000 / ₦25,000 / ₦100,000 | **unverified — awaiting confirmation** |
| Founded 2019 | LinkedIn — **conflicts with the foundation's own "Since 2008"** |

If any figure changes, update it here and on the page that cites it.

### The Goodstack record

Goodstack is the nonprofit-verification service behind the charity discounts offered by Zoom,
Asana, Atlassian, Adobe, OpenAI and others. The foundation **is already in Goodstack's
registry-backed database**, sourced from its CAC record:

| Field | Value |
|---|---|
| Goodstack ID | `organisation_000000CmCZg1necqCZ5hKYoGDXX96` |
| Registry | CAC — Corporate Affairs Commission / CAC (Nigeria) |
| Registry ID | 7008093 |
| Registered address | NO 1, Oduduwa Road, University of Ibadan, Ibadan, Nigeria |
| Record created | 2024-01-21 · registration active |
| Type | nonprofit |
| **Claimed** | **No** (`claimedAt: null`) |

Two consequences:

1. **Nobody has claimed the record.** Until someone at the foundation does, the foundation
   cannot use it to unlock the nonprofit discounts. Claim it at
   https://causes.goodstack.io/claim — the CAC number **7008093** is the credential the
   claim flow asks for.
2. **The record has no website.** Adding `chrysolitefoundation.ng` to the claimed profile is
   itself a benefit: it is what the discount providers check to confirm the organisation is
   real and operating.

**Full source chain, raw API responses and re-verification commands: [`GOODSTACK.md`](GOODSTACK.md).**
That document also records why the local `orgs.jsonl` snapshot must not be used to prove a
negative — it holds 100 of Nigeria's 4,963 registered non-profits.

The record can change — re-check before relying on the details above.

### Where the contact details come from

Every contact detail published on this site traces to a source. Nothing is invented.

| Detail | Value | Source |
|---|---|---|
| Email | `chrysoliteinfo@gmail.com` | the foundation's own former website, archived 2025-02-24 |
| Phone | +234 80 32 60 21 80 | same |
| Phone | +234 80 67 35 95 96 | same |
| Programme office | Juli Alice Hall, Cilareta Filling Station, Oluyole Estate Road, Oluyole, Ibadan | supplied by the foundation |
| Registered office | NO 1, Oduduwa Road, University of Ibadan, Ibadan | CAC record, via Goodstack |

The email is deliberately a **Gmail address, not a domain address**. The foundation never had
domain email — that is what its own site used. Do not "improve" it to `info@…`; an address at a
domain nobody owns cannot receive mail.

**The website domain.** The foundation used to run a site at `chrysolitefoundation.ng`, live from
February 2023 to February 2025. The Internet Archive holds 55 captures, including two subdomains —
`chrysoliteinstitute.chrysolitefoundation.ng` (a training institute with certificate, associate and
bachelor's course pages) and `chrysoliteng.chrysolitefoundation.ng` (with `ibadan.html`,
`osogbo.html`, `events.html`). It is now dead:

- no DNS records at all (`NXDOMAIN` for `NS`, `A`, `MX`)
- NiRA's RDAP returns `404 — No results for query chrysolitefoundation.ng`, while `nira.org.ng`,
  `google.com.ng` and `cac.gov.ng` all return `200` from the same endpoint — so the 404 means
  "not registered", not "no such service"

**The domain is available to register.** Until it is, the `canonical`, `og:url`, `og:image` and
`sitemap.xml` URLs on this site point at a domain nobody owns. Registering it makes all of them
correct at once.

Do not confuse the foundation with three unrelated organisations that share the name:

| Domain | Organisation |
|---|---|
| `chrysolitefoundation.ng` | **this one** — Ibadan, Nigeria · CAC IT/7008093 |
| `chrysolitefoundation.com` | a Zimbabwe charity (Chitungwiza) |
| `chrysolitefoundation.org` | the same Zimbabwe charity's former Wix site |
| `thechrysolitefoundation.org` | a separate organisation |

To re-check any of this: `curl -s "https://rdap.nic.net.ng/domain/chrysolitefoundation.ng"`.

---

## 12. Support

Questions about the site itself: whoever built or maintains it.
Questions about the foundation: **chrysoliteinfo@gmail.com** · +234 80 32 60 21 80 · +234 80 67 35 95 96.
