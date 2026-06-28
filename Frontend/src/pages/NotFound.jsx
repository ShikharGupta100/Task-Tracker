import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <h1 className="text-8xl font-bold text-indigo-100">404</h1>
    <h2 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
    <p className="text-gray-400 text-sm mt-2 mb-8">The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;