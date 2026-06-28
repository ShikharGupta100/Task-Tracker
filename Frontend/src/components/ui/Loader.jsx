export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{ padding: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "50%",
        border: "3px solid var(--border)", borderTop: "3px solid #7c3aed",
        animation: "spin 0.8s linear infinite",
      }}/>
      <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)" }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}