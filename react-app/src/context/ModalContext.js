import { createContext, useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

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
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-70" onClick={onClose} />
      <div className="absolute w-auto bg-black top-1/3">
        {children}
      </div>
    </div>,
    modalNode
  );
};

export default ModalProvider;
