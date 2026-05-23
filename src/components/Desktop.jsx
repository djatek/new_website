import { useState, useEffect, useCallback } from "react";
import { APPS } from "../data/apps.js";
import { AboutContent, ProjectsContent, PhotosContent, MixesContent, VideosContent } from "../content/index.jsx";
import MenuBar from "./MenuBar.jsx";
import Window from "./Window.jsx";

// Map app id -> content component
const CONTENT = {
  about: AboutContent,
  projects: ProjectsContent,
  photos: PhotosContent,
  mixes: MixesContent,
  videos: VideosContent,
};

export default function Desktop() {
  const [isMobile, setIsMobile] = useState(false);
  const [wins, setWins] = useState({});      // id -> { open, x, y, z, zoomed }
  const [topZ, setTopZ] = useState(10);
  const [focusedId, setFocusedId] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const open = useCallback((id) => {
    const app = APPS.find((a) => a.id === id);
    setTopZ((z) => z + 1);
    setWins((w) => {
      const base = isMobile ? {} : w;  // one window at a time on mobile
      return { ...base, [id]: { open: true, x: app.x, y: app.y, z: topZ + 1, zoomed: false } };
    });
    setFocusedId(id);
  }, [isMobile, topZ]);

  const focus = useCallback((id) => {
    setTopZ((z) => z + 1);
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], z: topZ + 1 } } : w));
    setFocusedId(id);
  }, [topZ]);

  const close = useCallback((id) => {
    setWins((w) => { const n = { ...w }; delete n[id]; return n; });
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const zoom = useCallback((id) => {
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], zoomed: !w[id].zoomed } } : w));
  }, []);

  const drag = useCallback((id, x, y) => {
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], x, y } } : w));
  }, []);

  const openWins = Object.entries(wins).filter(([, s]) => s.open);

  return (
    <div
      style={{
        position: "fixed", inset: 0, overflow: "hidden", userSelect: "none",
        background: "var(--s7-gray)",
        backgroundImage: "repeating-conic-gradient(var(--s7-gray-dark) 0% 25%, var(--s7-gray-light) 0% 50%)",
        backgroundSize: "4px 4px",
      }}
    >
      <MenuBar />

      {/* Desktop icons (top-right, like the Macintosh HD) */}
      <div style={{ position: "absolute", top: 36, right: 12, display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => isMobile && open(app.id)}
            onDoubleClick={() => open(app.id)}
            style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: 76 }}
          >
            <span style={{ fontSize: 32, lineHeight: 1 }}>{app.icon}</span>
            <span style={{ fontSize: 11, background: "#fff", padding: "0 3px", border: "1px solid #0002" }}>{app.title}</span>
          </button>
        ))}
      </div>

      {openWins.map(([id, s]) => {
        const app = APPS.find((a) => a.id === id);
        const Body = CONTENT[id];
        return (
          <Window
            key={id}
            app={app}
            state={s}
            isMobile={isMobile}
            focused={focusedId === id}
            onFocus={focus}
            onClose={close}
            onZoom={zoom}
            onDrag={drag}
          >
            <Body onOpenProject={() => {}} />
          </Window>
        );
      })}

      {openWins.length === 0 && (
        <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 12, color: "#fff", textShadow: "1px 1px 0 #000" }}>
          {isMobile ? "Tap an icon to open" : "Double-click an icon to open"}
        </div>
      )}
    </div>
  );
}
