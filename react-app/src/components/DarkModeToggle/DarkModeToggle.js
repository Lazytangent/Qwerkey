import { useEffect } from "react";

import { Brightness2, Brightness7 } from "@material-ui/icons";

import { useDarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="flex items-center justify-between p-2">
      <div className="pr-1">
        <Brightness7 />
      </div>
      <div onClick={toggleDarkMode} className={`flex-shrink-0 w-14 h-8 p-1 rounded-full ${isDarkMode ? 'bg-green' : 'bg-gray-300'}`}>
        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}></div>
      </div>
      <div className="pl-1">
        <Brightness2 />
      </div>
    </div>
  );
};

export default DarkModeToggle;
