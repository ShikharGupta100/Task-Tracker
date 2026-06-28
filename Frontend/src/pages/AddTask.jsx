import TaskForm from "../components/task/TaskForm";

const AddTask = () => (
  <div className="max-w-2xl mx-auto">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Add New Task</h1>
      <p className="text-gray-500 text-sm mt-1">Fill in the details to create a new task.</p>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <TaskForm />
    </div>
  </div>
);

export default AddTask;