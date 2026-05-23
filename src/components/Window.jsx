import { useRef } from "react";

// A single System 7 window: pinstriped title bar, close + zoom boxes,
// drag-to-move (desktop) / fullscreen (mobile), scrollable content.
export default function Window({ app, state, isMobile, focused, onFocus, onClose, onZoom, onDrag, children }) {
  const start = useRef(null);

  const onPointerDown = (e) => {
    if (isMobile) return;
    onFocus(app.id);
    start.current = { mx: e.clientX, my: e.clientY, x: state.x, y: state.y };
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.mx;
    const dy = e.clientY - start.current.my;
    onDrag(app.id, Math.max(0, start.current.x + dx), Math.max(28, start.current.y + dy));
  };
  const onPointerUp = () => { start.current = null; };

  const frame = isMobile
    ? { position: "fixed", left: 0, top: "var(--s7-menubar-h)", right: 0, bottom: 0, zIndex: state.z }
    : state.zoomed
      ? { position: "absolute", left: 4, top: 32, width: "calc(100% - 8px)", height: "calc(100% - 40px)", zIndex: state.z }
      : { position: "absolute", left: state.x, top: state.y, width: app.w, height: app.h, zIndex: state.z };

  return (
    <div
      onMouseDown={() => onFocus(app.id)}
      style={{
        ...frame, background: "#fff", border: "1px solid #000",
        boxShadow: focused ? "2px 2px 0 var(--s7-shadow)" : "1px 1px 0 rgba(0,0,0,0.25)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          height: 20, display: "flex", alignItems: "center", padding: "0 6px", gap: 6,
          borderBottom: "1px solid #000", cursor: isMobile ? "default" : "grab",
          background: focused
            ? "repeating-linear-gradient(0deg,#000 0,#000 1px,#fff 1px,#fff 2px)"
            : "#fff",
        }}
      >
        <button
          aria-label="Close window"
          onClick={(e) => { e.stopPropagation(); onClose(app.id); }}
          style={{ width: 12, height: 12, border: "1px solid #000", background: "#fff", padding: 0, cursor: "pointer", flexShrink: 0 }}
        />
        <span style={{ flex: 1, textAlign: "center", fontSize: 12, background: focused ? "#fff" : "transparent", padding: "0 6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {app.title}
        </span>
        {!isMobile ? (
          <button
            aria-label="Zoom window"
            onClick={(e) => { e.stopPropagation(); onZoom(app.id); }}
            style={{ width: 12, height: 12, border: "1px solid #000", background: "#fff", padding: 0, cursor: "pointer", flexShrink: 0 }}
          />
        ) : <span style={{ width: 12 }} />}
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>{children}</div>
    </div>
  );
}
