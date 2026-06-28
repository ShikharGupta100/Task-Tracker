import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../../context/TaskContext";
import Button from "../ui/Button";
import { getTodayString } from "../../utils/helpers";

const initialState = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({ existing }) => {
  const navigate = useNavigate();
  const { createTask, updateTask } = useTaskContext();
  const [form, setForm] = useState(existing || initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    else if (form.title.trim().length < 3) e.title = "Title must be at least 3 characters";
    else if (form.title.trim().length > 100) e.title = "Title cannot exceed 100 characters";

    if (!form.description.trim()) e.description = "Description is required";
    else if (form.description.trim().length < 10) e.description = "Description must be at least 10 characters";
    else if (form.description.trim().length > 500) e.description = "Description cannot exceed 500 characters";

    if (!form.dueDate) e.dueDate = "Due date is required";
    else if (new Date(form.dueDate) < new Date(getTodayString())) e.dueDate = "Due date cannot be in the past";

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      if (existing) {
        await updateTask(existing._id, form);
      } else {
        await createTask(form);
      }
      navigate("/tasks");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors
    ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Design landing page"
          className={inputClass("title")}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        <p className="text-gray-400 text-xs mt-1">{form.title.length}/100</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe what needs to be done..."
          className={inputClass("description")}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        <p className="text-gray-400 text-xs mt-1">{form.description.length}/500</p>
      </div>

      {/* Status + Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass("status")}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} className={inputClass("priority")}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Due Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate ? form.dueDate.split("T")[0] : ""}
          onChange={handleChange}
          min={getTodayString()}
          className={inputClass("dueDate")}
        />
        {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={submitting} className="flex-1">
          {existing ? "Update Task" : "Create Task"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate(-1)} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;