import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

export default function Toast() {
  const { toast } = useContext(TaskContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2800);
      return () => clearTimeout(t);
    }
  }, [toast]);

  if (!toast || !visible) return null;
  const isSuccess = toast.type === "success";

  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 200,
      background: "var(--bg-card)",
      border: `1px solid ${isSuccess ? "rgba(52,211,153,0.35)" : "rgba(248,113,113,0.35)"}`,
      borderRadius: "12px", padding: "14px 18px",
      display: "flex", alignItems: "center", gap: "12px",
      boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
      minWidth: "260px", animation: "slideUp 0.3s ease",
    }}>
      <div style={{
        width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
        background: isSuccess ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {isSuccess
          ? <svg width="16" height="16" fill="none" stroke="#34d399" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          : <svg width="16" height="16" fill="none" stroke="#f87171" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        }
      </div>
      <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>{toast.message}</span>
      <style>{`@keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}