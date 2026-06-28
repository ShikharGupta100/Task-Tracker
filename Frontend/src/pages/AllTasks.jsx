import { useEffect, useState, useCallback } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";
import SearchBar from "../components/task/SearchBar";
import FilterBar from "../components/task/FilterBar";
import SortDropdown from "../components/task/SortDropdown";
import Loader from "../components/ui/Loader";

const AllTasks = () => {
  const { tasks, loading, error, fetchTasks } = useTaskContext();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("createdAt_desc");

  const load = useCallback(() => {
    fetchTasks({
      ...(search && { search }),
      ...(status !== "All" && { status }),
      ...(priority !== "All" && { priority }),
      sort,
    });
  }, [search, status, priority, sort, fetchTasks]);

  useEffect(() => {
    const timer = setTimeout(load, 300); // debounce search
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? "Loading..." : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterBar
            status={status} priority={priority}
            onStatusChange={setStatus} onPriorityChange={setPriority}
          />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg border border-red-200">{error}</div>
      )}

      {/* Task list */}
      {loading ? <Loader text="Fetching tasks..." /> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default AllTasks;