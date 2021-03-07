import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkModeContext = () => useContext(DarkModeContext);

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DarkModeContext.DarkModeProvider value={{ isDarkMode, setIsDarkMode }}>
      { children }
    </DarkModeContext.DarkModeProvider>
  );
};

export default DarkModeProvider;
