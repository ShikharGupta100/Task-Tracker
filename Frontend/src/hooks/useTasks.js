import { useState, useEffect } from "react";
import { taskAPI } from "../services/api";

// Standalone hook for pages that need their own fetch (e.g., TaskDetail)
export const useSingleTask = (id) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await taskAPI.getById(id);
        setTask(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return { task, loading, error };
};