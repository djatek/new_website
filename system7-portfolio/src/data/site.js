// ============================================================
// SITE DATA — your single source of truth.
// Fill these in during Phase 3. Everything on the desktop
// reads from here, so you rarely have to touch component code.
// ============================================================
export const SITE = {
  realName: "Your Name",
  djName:   "DJ Alias",
  email:    "you@example.com",

  socials: [
    { label: "SoundCloud", url: "https://soundcloud.com/yourhandle" },
    { label: "Instagram",  url: "https://instagram.com/yourhandle" },
  ],

  // 3–5 projects. `body` can hold JSX later; string for now.
  projects: [
    { id: "p1", title: "Project One",   body: "Description coming in Phase 3." },
    { id: "p2", title: "Project Two",   body: "Description coming in Phase 3." },
    { id: "p3", title: "Project Three", body: "Description coming in Phase 3." },
  ],

  // Put image files in /public/photos/ then list their paths here.
  photos: ["", "", "", "", "", ""],

  // Mixes: self-hosted files go in /public/audio/; SoundCloud uses `embed`.
  mixes: [
    { id: "m1", title: "Mix 1 — title TBD", src: "", embed: "" },
    { id: "m2", title: "Mix 2 — title TBD", src: "", embed: "" },
    { id: "m3", title: "Mix 3 — title TBD", src: "", embed: "" },
  ],
};
