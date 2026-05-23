import { useEffect, useState } from "react";

export default function MenuBar() {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "var(--s7-menubar-h)",
        background: "#fff", borderBottom: "1px solid #000",
        display: "flex", alignItems: "center", gap: 18, padding: "0 10px",
        fontSize: 13, zIndex: 9999,
      }}
    >
      <span style={{ fontWeight: "bold" }}>&#63743;{/* Apple logo glyph fallback */}</span>
      <span>File</span><span>Edit</span><span>View</span><span>Special</span>
      <span style={{ marginLeft: "auto" }}>{clock}</span>
    </div>
  );
}
