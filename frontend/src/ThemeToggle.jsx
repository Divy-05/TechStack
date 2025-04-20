import { useTheme } from "./context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    toggleTheme();
    setTimeout(() => setClicked(false), 500); // Reset click effect after animation
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Tooltip with smooth fade animation */}
      {hover && (
        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md mr-3 opacity-90 animate-fadeIn transition-opacity duration-300">
          Click to change theme
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 transform active:scale-90 relative overflow-hidden 
          ${theme === "dark" ? "bg-gray-900 hover:bg-gray-700 shadow-gray-700" : "bg-white hover:bg-gray-200 border border-gray-400 shadow-gray-300"}
          hover:ring-2 hover:ring-blue-400 dark:hover:ring-yellow-400`}
      >
        {/* Animated Icon */}
        <div
          className={`transition-transform duration-500 ease-in-out 
            ${clicked ? "scale-125 rotate-[180deg]" : "scale-100"}
            ${theme === "dark" ? "animate-spin-slow text-yellow-400" : "text-gray-700"}
            `}
        >
          {theme === "dark" ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
