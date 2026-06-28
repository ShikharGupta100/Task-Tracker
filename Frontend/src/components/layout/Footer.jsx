export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border-subtle)",
      padding: "20px 32px", textAlign: "center",
      fontSize: "13px", color: "var(--text-muted)",
    }}>
      © {new Date().getFullYear()} TaskTracker — Built with MERN Stack
    </footer>
  );
}