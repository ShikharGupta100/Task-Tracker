import { useParams } from "react-router-dom";
import TaskForm from "../components/task/TaskForm";
import Loader from "../components/ui/Loader";
import { useSingleTask } from "../hooks/useTasks";

const EditTask = () => {
  const { id } = useParams();
  const { task, loading, error } = useSingleTask(id);

  if (loading) return <Loader text="Loading task..." />;
  if (error) return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</div>;
  if (!task) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
        <p className="text-gray-500 text-sm mt-1">Update the task details below.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TaskForm existing={task} />
      </div>
    </div>
  );
};

export default EditTask;