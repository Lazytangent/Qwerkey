import { useDarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="flex justify-between items-center px-8 py-6">
      <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
      {/* <input type="checkbox" value={isDarkMode} className="w-16 h-10 bg-gray-300 rounded-full flex-shrink-0 p-1" onChange={toggleDarkMode} /> */}
      <div className="w-16 h-10 bg-gray-300 rounded-full flex-shrink-0 p-1">
        <div className="bg-white w-8 h-8 rounded-full shadow-md"></div>
      </div>
      <span></span>
    </div>
  );
};

export default DarkModeToggle;
