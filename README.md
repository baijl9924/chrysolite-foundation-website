# Chrysolite Empowerment and Education Foundation — website

Static site for **Chrysolite Empowerment and Education Foundation**, a CAC-registered
non-profit in Ibadan, Nigeria — Incorporated Trustees, `IT/7008093`, status Active.

**Live:** https://chrysolite-foundation.org

## Layout

| Path | What it is |
|---|---|
| `index.html` … `contact.html` | The eight pages |
| `single-post.html` | The article layout the Stories page links to |
| `style.css` | The whole design system, commented inline |
| `css/`, `js/`, `plugins/`, `fonts/` | Vendor assets — Bootstrap 5.1.3, Ionicons, Chocolat, Masonry |
| `images/` | Logo, social share card, photography, registration certificate |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | Crawler and browser furniture |

## Running it

There is no build step. Open `index.html` directly, or serve the folder:

```sh
python -m http.server 8100
```

## Assets and attribution

Third-party asset licences and attributions are recorded in the project's `NOTICE` file,
which is kept with the project documentation rather than published here. Attribution
required to appear on the site itself is already rendered on the site.
