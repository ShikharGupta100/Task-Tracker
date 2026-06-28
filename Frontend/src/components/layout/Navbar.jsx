import { useNavigate } from "react-router-dom";

export default function Navbar({ onMenuToggle }) {
  const navigate = useNavigate();

  return (
    <header style={{
      background: "rgba(10,10,15,0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-subtle)",
      position: "sticky", top: 0, zIndex: 50,
      padding: "0 24px", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={onMenuToggle}
          className="mobile-menu-btn"
          style={{ display: "none", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: "4px" }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)", lineHeight: 1.2 }}>TaskTracker</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Dashboard overview</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/add")}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          color: "white", border: "none", borderRadius: "10px",
          padding: "9px 18px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
        }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Task
      </button>
    </header>
  );
}