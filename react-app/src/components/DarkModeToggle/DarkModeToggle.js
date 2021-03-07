import { useDarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="flex items-center justify-between px-8 py-6">
      <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
      <div onClick={toggleDarkMode} className={`flex-shrink-0 w-16 h-10 p-1 rounded-full ${isDarkMode ? 'bg-green' : 'bg-gray-300'}`}>
        <div className={`w-8 h-8 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}></div>
      </div>
      <span></span>
    </div>
  );
};

export default DarkModeToggle;
