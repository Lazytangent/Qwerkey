import { useDarkModeContext } from '../../context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </>
  )
};

export default DarkModeToggle;
