import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSingleTask } from "../hooks/useTasks";
import { useTaskContext } from "../context/TaskContext";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import ConfirmModal from "../components/ui/ConfirmModal";
import { STATUS_COLORS, PRIORITY_COLORS, formatDate, isOverdue } from "../utils/helpers";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, loading, error } = useSingleTask(id);
  const { deleteTask } = useTaskContext();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTask(id);
      navigate("/tasks");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader text="Loading task..." />;
  if (error) return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</div>;
  if (!task) return null;

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Back */}
        <Link to="/tasks" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tasks
        </Link>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label={task.status} {...STATUS_COLORS[task.status]} />
            <Badge label={task.priority} {...PRIORITY_COLORS[task.priority]} />
            {overdue && (
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                Overdue
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>

          {/* Description */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Description</p>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{task.description}</p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-1">Due Date</p>
              <p className={`text-sm font-medium ${overdue ? "text-red-500" : "text-gray-700"}`}>
                {formatDate(task.dueDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Created</p>
              <p className="text-sm font-medium text-gray-700">{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Last Updated</p>
              <p className="text-sm font-medium text-gray-700">{formatDate(task.updatedAt)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link to={`/edit/${task._id}`} className="flex-1">
              <Button variant="outline" className="w-full">Edit Task</Button>
            </Link>
            <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        loading={deleting}
      />
    </>
  );
};

export default TaskDetail;