import { Link } from "react-router-dom";
import { Ghost, ArrowLeftCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Ghost className="w-24 h-24 text-blue-600 animate-bounce" />
      <h1 className="text-6xl font-extrabold text-blue-600 mt-4 animate-pulse">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Uh-oh! Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
