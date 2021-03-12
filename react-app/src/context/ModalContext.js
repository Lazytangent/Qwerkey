import { createContext, useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

import { useDarkModeContext } from "./DarkModeContext";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({ onClose, children }) => {
  const { isDarkMode } = useDarkModeContext();
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={`z-20 fixed inset-0 flex items-center justify-center ${isDarkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 bg-black bg-opacity-70" onClick={onClose} />
      <div className="absolute w-auto my-auto">
        {children}
      </div>
    </div>,
    modalNode
  );
};

export default ModalProvider;
