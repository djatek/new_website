# System 7 Portfolio

A personal portfolio + DJ site styled as a loose homage to Mac OS System 7.
Built with Vite + React + Tailwind v4.

## Quick start

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  data/
    apps.js        # desktop icons + default window sizes
    site.js        # YOUR CONTENT: name, email, socials, projects, photos, mixes
  content/
    index.jsx      # the components rendered inside each window (Phase 3)
  components/
    Desktop.jsx    # window manager: open/close/focus/drag/zoom + mobile logic
    Window.jsx     # a single draggable System 7 window
    MenuBar.jsx    # top menu bar with live clock
  App.jsx
  main.jsx
  index.css        # Tailwind import + System 7 theme tokens
```

**To add your content, you mostly edit two files:** `src/data/site.js`
(the data) and `src/content/index.jsx` (how it's displayed). You rarely
need to touch the window machinery.

## Adding media

- **Photos:** drop files in `public/photos/`, then list their paths in
  `site.js` → `photos`.
- **Self-hosted mixes:** drop `.mp3`s in `public/audio/`, reference in
  `site.js` → `mixes[].src`. Keep total repo media well under ~1 GB.
- **SoundCloud:** put the embed URL in `mixes[].embed`.
- **Videos:** Dropbox share links work if you change `?dl=0` to `?raw=1`.
  If bandwidth becomes an issue, move to Vimeo.

## Deploying

### Custom domain (your case)

1. In `vite.config.js`, keep `base: '/'` (already set).
2. Create `public/CNAME` containing just your domain, e.g. `yourdomain.com`.
3. Push to GitHub. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and
   deploys on every push to `main`.
5. Point your domain's DNS at GitHub Pages (A records to GitHub's IPs, or a
   CNAME record to `<user>.github.io`).

### Project page (no custom domain)

If you deploy to `https://<user>.github.io/<repo>/` instead, change
`base` in `vite.config.js` to `'/<repo>/'` and remove the CNAME file.

## TODO (Phases 3–5)

- [ ] Write bio, fill in `site.js`
- [ ] Add 3–5 projects with descriptions
- [ ] Add photos
- [ ] Wire up mixes (audio + SoundCloud) and videos
- [ ] Self-host the Chicago font (currently CDN — see `index.html`)
- [ ] Replace emoji icons with pixel icons (polish)
- [ ] Accessibility pass (ARIA roles, keyboard nav)
