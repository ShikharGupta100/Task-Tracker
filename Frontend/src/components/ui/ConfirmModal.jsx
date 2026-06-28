export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "16px", padding: "28px", maxWidth: "400px", width: "100%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "12px",
          background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px",
        }}>
          <svg width="22" height="22" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h3>
        <p style={{ margin: "0 0 24px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--text-secondary)", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "11px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
            background: "rgba(248,113,113,0.2)", border: "1px solid rgba(248,113,113,0.4)",
            color: "#f87171", cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}