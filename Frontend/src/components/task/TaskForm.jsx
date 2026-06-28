import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../context/TaskContext";
import { getTodayString } from "../../utils/helpers";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  background: "var(--bg-secondary)", border: "1px solid var(--border)",
  borderRadius: "10px", color: "var(--text-primary)", fontSize: "14px",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
};

export default function TaskForm({ existing }) {
  const { createTask, updateTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    status: existing?.status || "Pending",
    priority: existing?.priority || "Medium",
    dueDate: existing?.dueDate ? existing.dueDate.split("T")[0] : "",
  });

  const validate = () => {
    const e = {};
    if (!form.title.trim() || form.title.length < 3) e.title = "Title must be at least 3 characters";
    if (form.title.length > 100) e.title = "Title must be under 100 characters";
    if (!form.description.trim() || form.description.length < 10) e.description = "Description must be at least 10 characters";
    if (form.description.length > 500) e.description = "Description must be under 500 characters";
    if (!form.dueDate) e.dueDate = "Due date is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      if (existing) await updateTask(existing._id, form);
      else await createTask(form);
      navigate("/tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "680px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "var(--text-primary)" }}>
          {existing ? "Edit Task" : "Add New Task"}
        </h1>
        <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "14px" }}>
          {existing ? "Update the task details below." : "Fill in the details to create a new task."}
        </p>
      </div>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Title */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
            Title <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Enter task title..."
            maxLength={100}
            style={{ ...inputStyle, borderColor: errors.title ? "#f87171" : "var(--border)" }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"}
            onBlur={e => e.target.style.borderColor = errors.title ? "#f87171" : "var(--border)"}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            {errors.title && <p style={{ margin: 0, fontSize: "12px", color: "#f87171" }}>{errors.title}</p>}
            <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)" }}>{form.title.length}/100</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
            Description <span style={{ color: "#f87171" }}>*</span>
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the task in detail..."
            maxLength={500}
            rows={4}
            style={{ ...inputStyle, resize: "vertical", borderColor: errors.description ? "#f87171" : "var(--border)" }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"}
            onBlur={e => e.target.style.borderColor = errors.description ? "#f87171" : "var(--border)"}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            {errors.description && <p style={{ margin: 0, fontSize: "12px", color: "#f87171" }}>{errors.description}</p>}
            <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)" }}>{form.description.length}/500</span>
          </div>
        </div>

        {/* Status + Priority */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              style={inputStyle} onFocus={e => e.target.style.borderColor = "#7c3aed"} onBlur={e => e.target.style.borderColor = "var(--border)"}>
              <option>Pending</option><option>In Progress</option><option>Completed</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>Priority</label>
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
              style={inputStyle} onFocus={e => e.target.style.borderColor = "#7c3aed"} onBlur={e => e.target.style.borderColor = "var(--border)"}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
            Due Date <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
            min={getTodayString()}
            style={{ ...inputStyle, colorScheme: "dark", borderColor: errors.dueDate ? "#f87171" : "var(--border)" }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"} onBlur={e => e.target.style.borderColor = errors.dueDate ? "#f87171" : "var(--border)"}
          />
          {errors.dueDate && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#f87171" }}>{errors.dueDate}</p>}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button onClick={() => navigate(-1)} style={{
            flex: 1, padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
            background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 2, padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
            background: loading ? "var(--border)" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
            border: "none", color: "white", cursor: loading ? "not-allowed" : "pointer",
          }}>{loading ? "Saving..." : existing ? "Save Changes" : "Create Task"}</button>
        </div>
      </div>
    </div>
  );
}