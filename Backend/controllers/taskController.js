const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");


const getTasks = asyncHandler(async (req, res) => {
  const { search, status, priority, sort } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status && status !== "All") {
    query.status = status;
  }

  if (priority && priority !== "All") {
    query.priority = priority;
  }

  // Sort options
  let sortOption = { createdAt: -1 }; 
  if (sort === "title_asc") sortOption = { title: 1 };
  if (sort === "title_desc") sortOption = { title: -1 };
  if (sort === "dueDate_asc") sortOption = { dueDate: 1 };
  if (sort === "dueDate_desc") sortOption = { dueDate: -1 };
  if (sort === "priority_asc") sortOption = { priority: 1 };
  if (sort === "createdAt_asc") sortOption = { createdAt: 1 };

  const tasks = await Task.find(query).sort(sortOption);

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});


const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});


const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    res.status(400);
    throw new Error("Title, description, and due date are required");
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,          
    runValidators: true, 
  });

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});


const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: {},
  });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};