import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { useSingleTask } from "../hooks/useTasks";
import ConfirmModal from "../components/ui/ConfirmModal";
import Loader from "../components/ui/Loader";
import { formatDate, isOverdue } from "../utils/helpers";

const statusClass = { "Pending": "status-pending", "In Progress": "status-inprogress", "Completed": "status-completed" };
const priorityClass = { "Low": "priority-low", "Medium": "priority-medium", "High": "priority-high" };

export default function TaskDetail() {
  const { id } = useParams();
  const { deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const { task, loading } = useSingleTask(id);
  const [showModal, setShowModal] = useState(false);

  if (loading) return <Loader text="Loading task..." />;
  if (!task) return (
    <div style={{ padding: "32px", textAlign: "center" }}>
      <p style={{ color: "var(--text-muted)" }}>Task not found.</p>
      <button onClick={() => navigate("/tasks")} style={{ color: "#a78bfa", background: "none", border: "none", cursor: "pointer" }}>← Back</button>
    </div>
  );

  const overdue = isOverdue(task.dueDate) && task.status !== "Completed";

  return (
    <>
      <div style={{ padding: "32px", maxWidth: "720px" }}>
        <button onClick={() => navigate("/tasks")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "14px", marginBottom: "24px", padding: 0 }}>
          ← Back to tasks
        </button>

        <div style={{ background: "var(--bg-card)", border: `1px solid ${overdue ? "rgba(248,113,113,0.35)" : "var(--border)"}`, borderRadius: "16px", padding: "32px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <span className={statusClass[task.status]} style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px" }}>{task.status}</span>
            <span className={priorityClass[task.priority]} style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px" }}>{task.priority}</span>
            {overdue && <span style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", color: "#f87171", background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.25)" }}>Overdue</span>}
          </div>

          <h1 style={{ margin: "0 0 16px", fontSize: "24px", fontWeight: 800, color: "var(--text-primary)" }}>{task.title}</h1>
          <p style={{ margin: "0 0 28px", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{task.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {[
              { label: "Due Date", value: task.dueDate ? formatDate(task.dueDate) : "—" },
              { label: "Created", value: formatDate(task.createdAt) },
              { label: "Last Updated", value: formatDate(task.updatedAt) },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "var(--bg-secondary)", borderRadius: "10px", padding: "14px 16px" }}>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{label}</div>
                <div style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => navigate(`/edit/${task._id}`)} style={{
              flex: 1, padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", color: "white", cursor: "pointer",
            }}>Edit Task</button>
            <button onClick={() => setShowModal(true)} style={{
              padding: "12px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
              background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", cursor: "pointer",
            }}>Delete</button>
          </div>
        </div>
      </div>

      <ConfirmModal isOpen={showModal} onClose={() => setShowModal(false)}
        onConfirm={async () => { await deleteTask(task._id); navigate("/tasks"); }}
        title="Delete Task" message={`Delete "${task.title}"? This cannot be undone.`}
      />
    </>
  );
}