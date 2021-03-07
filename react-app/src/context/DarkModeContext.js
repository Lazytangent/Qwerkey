import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkModeContext = () => useContext(DarkModeContext);

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      { children }
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
