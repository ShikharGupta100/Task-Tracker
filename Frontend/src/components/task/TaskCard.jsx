import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../context/TaskContext";
import ConfirmModal from "../ui/ConfirmModal";
import { formatDate, isOverdue } from "../../utils/helpers";

const statusClass = { "Pending": "status-pending", "In Progress": "status-inprogress", "Completed": "status-completed" };
const priorityClass = { "Low": "priority-low", "Medium": "priority-medium", "High": "priority-high" };

export default function TaskCard({ task }) {
  const { deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const overdue = isOverdue(task.dueDate) && task.status !== "Completed";

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
          border: `1px solid ${overdue ? "rgba(248,113,113,0.35)" : hovered ? "rgba(124,58,237,0.3)" : "var(--border)"}`,
          borderRadius: "14px", padding: "20px",
          display: "flex", flexDirection: "column", gap: "12px",
          transition: "all 0.2s",
          boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className={statusClass[task.status]} style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px" }}>
            {task.status}
          </span>
          <span className={priorityClass[task.priority]} style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px" }}>
            {task.priority}
          </span>
        </div>

        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
          {task.title}
        </h3>

        <p style={{
          margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {task.description}
        </p>

        {task.dueDate && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" fill="none" stroke={overdue ? "#f87171" : "var(--text-muted)"} strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            <span style={{ fontSize: "12px", color: overdue ? "#f87171" : "var(--text-muted)", fontWeight: 500 }}>
              Due {formatDate(task.dueDate)}{overdue ? " · Overdue" : ""}
            </span>
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          <button onClick={() => navigate(`/tasks/${task._id}`)} style={{
            flex: 1, padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--text-secondary)", cursor: "pointer",
          }}>View</button>
          <button onClick={() => navigate(`/edit/${task._id}`)} style={{
            flex: 1, padding: "8px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--text-secondary)", cursor: "pointer",
          }}>Edit</button>
          <button onClick={() => setShowModal(true)} style={{
            padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.3)",
            color: "#f87171", cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => { deleteTask(task._id); setShowModal(false); }}
        title="Delete Task"
        message={`Delete "${task.title}"? This cannot be undone.`}
      />
    </>
  );
}