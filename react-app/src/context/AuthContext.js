import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal, authenticated, setAuthenticated }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
