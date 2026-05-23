// ============================================================
// WINDOW CONTENT — Phase 3 lives here.
// Each section is a plain React component. Replace the
// placeholders with your real bio, projects, photos, mixes.
// Keeping content separate from the window machinery means
// you (or Claude) can edit copy without touching the OS code.
// ============================================================
import { SITE } from "../data/site.js";

function Placeholder({ note }) {
  return (
    <p style={{ color: "#888", fontStyle: "italic", fontSize: 11, margin: "8px 0 0" }}>
      [ {note} ]
    </p>
  );
}

export function AboutContent() {
  return (
    <div style={{ padding: 16, fontSize: 12, lineHeight: 1.6 }}>
      <p style={{ marginTop: 0, fontWeight: "bold", fontSize: 14 }}>
        {SITE.realName} <span style={{ fontWeight: "normal", color: "#555" }}>aka {SITE.djName}</span>
      </p>
      <p>Your bio goes here. Who you are, what you make, what you play.</p>
      <p style={{ marginBottom: 4 }}>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {SITE.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </div>
      <Placeholder note="Phase 3: write bio, add a photo, confirm links" />
    </div>
  );
}

export function ProjectsContent({ onOpenProject }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 16 }}>
        {SITE.projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenProject?.(p)}
            style={{ background: "transparent", border: "none", cursor: "pointer", textAlign: "center" }}
          >
            <div style={{ fontSize: 32 }}>📦</div>
            <div style={{ fontSize: 11, marginTop: 4 }}>{p.title}</div>
          </button>
        ))}
      </div>
      <Placeholder note="Phase 3: 3–5 real projects; each opens a detail window" />
    </div>
  );
}

export function PhotosContent() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8 }}>
        {SITE.photos.map((src, i) => (
          <div key={i} style={{ aspectRatio: "1", background: "#cfcfcf", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#666" }}>
            Photo {i + 1}
          </div>
        ))}
      </div>
      <Placeholder note="Phase 3: drop images in /public/photos and list them in site.js" />
    </div>
  );
}

export function MixesContent() {
  return (
    <div style={{ padding: 16, fontSize: 12 }}>
      {SITE.mixes.map((m) => (
        <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #ccc" }}>
          <span style={{ border: "1px solid #000", padding: "2px 6px", background: "#ddd" }}>▶</span>
          <span>{m.title}</span>
        </div>
      ))}
      <Placeholder note="Phase 3: self-hosted audio + SoundCloud embeds" />
    </div>
  );
}

export function VideosContent() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#000", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}>
        ▶ Video player
      </div>
      <Placeholder note="Phase 3: Dropbox direct links now, Vimeo if bandwidth needs it" />
    </div>
  );
}
