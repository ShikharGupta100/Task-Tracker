import { Link } from "react-router-dom";
import { useState } from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal";
import { useTaskContext } from "../../context/TaskContext";
import { STATUS_COLORS, PRIORITY_COLORS, formatDate, isOverdue } from "../../utils/helpers";

const TaskCard = ({ task }) => {
  const { deleteTask } = useTaskContext();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const overdue = isOverdue(task.dueDate, task.status);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTask(task._id);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className={`bg-white rounded-xl border p-5 hover:shadow-md transition-all duration-200 flex flex-col gap-3
        ${overdue ? "border-red-200" : "border-gray-200"}`}>

        {/* Top row: badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge label={task.status} {...STATUS_COLORS[task.status]} />
          <Badge label={task.priority} {...PRIORITY_COLORS[task.priority]} />
        </div>

        {/* Title */}
        <Link to={`/tasks/${task._id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-1">
            {task.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2">{task.description}</p>

        {/* Due date */}
        <div className={`flex items-center gap-1.5 text-xs font-medium
          ${overdue ? "text-red-500" : "text-gray-400"}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {overdue ? "Overdue · " : "Due · "}
          {formatDate(task.dueDate)}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1 border-t border-gray-100">
          <Link to={`/tasks/${task._id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">View</Button>
          </Link>
          <Link to={`/edit/${task._id}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        loading={deleting}
      />
    </>
  );
};

export default TaskCard;