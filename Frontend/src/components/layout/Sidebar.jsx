import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/", label: "Dashboard",
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  },
  {
    to: "/tasks", label: "All Tasks",
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
  },
  {
    to: "/add", label: "Add Task",
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside style={{
      width: "220px", background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border-subtle)",
      height: "100vh", position: "sticky", top: 0,
      display: "flex", flexDirection: "column",
      padding: "24px 16px", gap: "4px", flexShrink: 0,
    }}>
      <div style={{ marginBottom: "32px", padding: "0 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)" }}>TaskTracker</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Premium task management</div>
          </div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onClose}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px",
              textDecoration: "none", fontSize: "14px", fontWeight: 500,
              transition: "all 0.15s",
              background: isActive ? "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,70,229,0.2))" : "transparent",
              color: isActive ? "#a78bfa" : "var(--text-secondary)",
              border: isActive ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: "auto" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))",
          border: "1px solid rgba(124,58,237,0.2)", borderRadius: "12px", padding: "16px",
        }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>Team productivity</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "10px" }}>92% completion this week</div>
          <div style={{ background: "var(--border)", borderRadius: "4px", height: "4px" }}>
            <div style={{ width: "92%", height: "100%", borderRadius: "4px", background: "linear-gradient(90deg, #7c3aed, #8b5cf6)" }}/>
          </div>
        </div>
      </div>
    </aside>
  );
}