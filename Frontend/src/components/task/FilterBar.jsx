const STATUS_OPTIONS = ["All", "Pending", "In Progress", "Completed"];
const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High"];

const FilterBar = ({ status, priority, onStatusChange, onPriorityChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Status filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 font-medium whitespace-nowrap">Status:</label>
        <div className="flex gap-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${status === s
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Priority filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 font-medium whitespace-nowrap">Priority:</label>
        <div className="flex gap-1">
          {PRIORITY_OPTIONS.map((p) => (
            <button
              key={p}
              onClick={() => onPriorityChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${priority === p
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;