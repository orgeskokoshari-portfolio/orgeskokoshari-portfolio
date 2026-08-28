# Orges Kokoshari — portfolio

Astro static site with a browser-based CMS. Free hosting, no monthly fee.

> **Not yet verified.** This scaffold was written without network access, so
> `npm install` was never run against it. Expect a handful of small fixes on
> first build — import paths, an Astro API that moved, a type complaint.
> Hand this folder to Claude Code and say "get `npm run dev` working"; it has
> a terminal and can fix these in minutes. The design, structure and CMS
> config are the parts worth keeping.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs to dist/
```

Node 18.20+, 20.3+, or 22+.

---

## Where everything lives

| What | Where | Why |
|---|---|---|
| Images (stills, thumbnails, layers) | `src/assets/media/` | Astro optimises these — generates AVIF/WebP at several widths automatically |
| Videos (loops, previews) | `public/media/` | Served as-is; Astro doesn't process video |
| CV / PDFs | `public/` | Fixed public URL that never changes |
| Project content | `src/content/projects/*.md` | One markdown file per project |
| Site-wide text | `src/content/site/*.md` | About page, reel settings |

**Rule of thumb for video:** if it has a play button and sound, it goes to
Vimeo and you paste the URL. If it loops silently as part of the design
(hero background, hover previews, layer clips), it's a short MP4 in
`public/media/` — 3-6 seconds, under ~500 KB.

---

## First-time setup

### 1. Push to GitHub

```bash
git init && git add -A && git commit -m "Initial site"
gh repo create kokoshari-portfolio --private --source=. --push
```

### 2. Deploy on Cloudflare Pages

Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.

- Build command: `npm run build`
- Output directory: `dist`

Every push rebuilds automatically, roughly 40 seconds.

### 3. Point the domain

In Cloudflare Pages → Custom domains, add `orgeskokoshari.com`. It gives you
DNS records. Add those at GoDaddy. Keep the old Squarespace site live until
the new one resolves correctly.

### 4. Turn on the CMS

The admin panel at `/admin` needs an OAuth bridge so it can commit to GitHub
on your behalf. Sveltia publishes a one-click Cloudflare Worker for this:

https://github.com/sveltia/sveltia-cms-auth

Deploy it, create a GitHub OAuth app pointing at it, then fill in
`public/admin/config.yml`:

```yaml
repo: YOUR-GITHUB-USERNAME/kokoshari-portfolio
base_url: https://sveltia-cms-auth.YOUR-SUBDOMAIN.workers.dev
```

Then visit `orgeskokoshari.com/admin`, sign in with GitHub, and you're done.
That is the last time you touch a config file.

---

## Publishing after that

1. Go to `orgeskokoshari.com/admin`
2. Projects → New project
3. Title, category, role, thumbnail
4. Add layers — layer 1 is the finished piece, up to six total
5. Publish

Live in about a minute. You never see Git or a terminal.

---

## Notes on content

- **Layers cap at six.** Past that the labels under the scrub bar collide.
- **Layer 1 is always the finished piece.** Everything after peels backwards.
- **Video layers need a poster frame.** iOS low-power mode blocks autoplay,
  so the poster is what a real share of visitors actually see.
- **Keep Selected Work to 18-24 projects.** Beyond that your eleventh-best
  piece dilutes your best one.
- **Nothing is cropped anywhere.** All media is `object-fit: contain`, so
  export at 16:9 and it fills the frame exactly.

---

## Ownership

Everything except the Vimeo files sits in your GitHub repo. Stop paying
Cloudflare, stop paying anyone — you still have every image, every word, and
the code that assembles them.
