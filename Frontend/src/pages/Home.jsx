import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import Loader from "../components/ui/Loader";
import { STATUS_COLORS, PRIORITY_COLORS } from "../utils/helpers";

const StatCard = ({ label, value, color }) => (
  <div className={`bg-white rounded-xl border border-gray-200 p-5`}>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

const Home = () => {
  const { tasks=[], loading, error, fetchTasks } = useTaskContext();

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    high: tasks.filter((t) => t.priority === "High").length,
  };

  const recent = [...tasks].slice(0, 5);

  if (loading) return <Loader text="Loading dashboard..." />;
  if (error) return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's your task overview.</p>
        </div>
        <Link
          to="/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Task
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={stats.total} color="text-gray-800" />
        <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
        <StatCard label="In Progress" value={stats.inProgress} color="text-blue-600" />
        <StatCard label="Completed" value={stats.completed} color="text-green-600" />
      </div>

      {/* Progress bar */}
      {stats.total > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700">Overall Progress</p>
            <p className="text-sm text-gray-500">
              {Math.round((stats.completed / stats.total) * 100)}% complete
            </p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Recent tasks */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Recent Tasks</h2>
          <Link to="/tasks" className="text-sm text-indigo-600 hover:underline">View all →</Link>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No tasks yet.{" "}
            <Link to="/add" className="text-indigo-600 hover:underline">Create one</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recent.map((task) => (
              <Link
                key={task._id}
                to={`/tasks/${task._id}`}
                className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[task.status].dot}`} />
                  <span className="text-sm text-gray-700 truncate">{task.title}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0
                  ${PRIORITY_COLORS[task.priority].bg} ${PRIORITY_COLORS[task.priority].text}`}>
                  {task.priority}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;