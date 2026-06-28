import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/task/TaskCard";
import Loader from "../components/ui/Loader";

const StatCard = ({ label, value, sub, color, icon }) => (
  <div
    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "24px", flex: 1, minWidth: "160px", transition: "border-color 0.2s" }}
    onMouseOver={e => e.currentTarget.style.borderColor = color}
    onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
      <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "18px" }}>{icon}</span>
      </div>
    </div>
    <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, marginBottom: "6px" }}>{value}</div>
    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{sub}</div>
  </div>
);

export default function Home() {
  const { tasks = [], loading } = useContext(TaskContext);
  const navigate = useNavigate();

  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const recent = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div style={{ padding: "32px", maxWidth: "1200px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "var(--text-primary)" }}>Dashboard</h1>
        <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "14px" }}>Overview of all your tasks and progress</p>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
        <StatCard label="Total Tasks" value={tasks.length} sub="Across all projects" color="#7c3aed" icon="📋" />
        <StatCard label="Pending" value={pending} sub="Awaiting action" color="#f59e0b" icon="⏳" />
        <StatCard label="In Progress" value={inProgress} sub="Currently active" color="#38bdf8" icon="🔄" />
        <StatCard label="Completed" value={completed} sub="Delivered this month" color="#34d399" icon="✅" />
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>Recent Tasks</h2>
          <button onClick={() => navigate("/tasks")} style={{
            background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)",
            borderRadius: "8px", padding: "7px 14px", fontSize: "13px", cursor: "pointer",
          }}>View all →</button>
        </div>

        {recent.length === 0 ? (
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "48px", textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
            <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>No tasks yet. Add your first task to get started.</p>
            <button onClick={() => navigate("/add")} style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white",
              border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
            }}>+ Add Task</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {recent.map(task => <TaskCard key={task._id} task={task} />)}
          </div>
        )}
      </div>
    </div>
  );
}