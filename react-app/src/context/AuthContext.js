import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <AuthContext.Provider value={{ showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
