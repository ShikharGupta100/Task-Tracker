// Format date to readable string
export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


export const isOverdue = (dueDate, status) => {
  if (status === "Completed") return false;
  return new Date(dueDate) < new Date();
};

export const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

// Color maps
export const STATUS_COLORS = {
  Pending: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-400" },
  "In Progress": { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-400" },
  Completed: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-400" },
};

export const PRIORITY_COLORS = {
  Low: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
  Medium: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-400" },
  High: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
};