import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAuthContext } from './context/AuthContext';
import { authenticate } from './store/session';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { authenticated, setAuthenticated } = useAuthContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [setAuthenticated]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </>
  );
};

export default App;
