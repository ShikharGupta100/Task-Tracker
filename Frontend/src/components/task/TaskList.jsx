import TaskCard from "./TaskCard";
import EmptyState from "../ui/EmptyState";

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;