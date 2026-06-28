import { createContext, useContext, useState, useCallback } from "react";
import { taskAPI } from "../services/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskAPI.getAll(params);
      setTasks(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (data) => {
    const res = await taskAPI.create(data);
    showToast("Task created successfully! 🎉");
    return res.data.data;
  };

  const updateTask = async (id, data) => {
    const res = await taskAPI.update(id, data);
    showToast("Task updated successfully! ✅");
    return res.data.data;
  };

  const deleteTask = async (id) => {
    await taskAPI.delete(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast("Task deleted successfully! 🗑️");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        toast,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        showToast,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used inside TaskProvider");
  return context;
};