import { useState, useEffect, useContext, useCallback } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/task/TaskCard";
import Loader from "../components/ui/Loader";
import { taskAPI } from "../services/api";

export default function AllTasks() {
  const { tasks: allTasks, loading: ctxLoading } = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchFiltered = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (sort) params.sort = sort;
      const res = await taskAPI.getAll(params);
      setTasks(res.data.data || []);
    } catch { setTasks([]); }
    finally { setLoading(false); }
  }, [search, status, priority, sort]);

  useEffect(() => { const t = setTimeout(fetchFiltered, 300); return () => clearTimeout(t); }, [fetchFiltered]);
  useEffect(() => { fetchFiltered(); }, [allTasks]);

  const pill = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding: "7px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 500,
      border: active ? "1px solid rgba(124,58,237,0.5)" : "1px solid var(--border)",
      background: active ? "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,70,229,0.2))" : "transparent",
      color: active ? "#a78bfa" : "var(--text-secondary)", cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1200px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "var(--text-primary)" }}>All Tasks</h1>
        <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "14px" }}>{tasks.length} task{tasks.length !== 1 ? "s" : ""} found</p>
      </div>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..."
            style={{ width: "100%", padding: "11px 14px 11px 40px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-primary)", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"} onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Status:</span>
          {["", "Pending", "In Progress", "Completed"].map(s => pill(s || "All", status === s, () => setStatus(s)))}
          <span style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 0 12px" }}>Priority:</span>
          {["", "Low", "Medium", "High"].map(p => pill(p || "All", priority === p, () => setPriority(p)))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Sort:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "13px", padding: "7px 12px", outline: "none" }}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {loading || ctxLoading ? <Loader text="Loading tasks..." /> : tasks.length === 0 ? (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "64px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>No tasks match your filters.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {tasks.map(task => <TaskCard key={task._id} task={task} />)}
        </div>
      )}
    </div>
  );
}