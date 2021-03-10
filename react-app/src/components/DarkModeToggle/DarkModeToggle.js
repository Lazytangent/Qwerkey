import { useDarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="items-center justify-between hidden p-2 md:flex">
      <p className="px-2">{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
      <div onClick={toggleDarkMode} className={`flex-shrink-0 w-14 h-8 p-1 rounded-full ${isDarkMode ? 'bg-green' : 'bg-gray-300'}`}>
        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}></div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
