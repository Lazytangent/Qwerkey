import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAuthContext } from './context/AuthContext';
import { authenticate } from './store/session';
import NavBar from './components/NavBar';
import PostsContainer from './components/PostsContainer';

const App = () => {
  const { setAuthenticated } = useAuthContext();
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
        <Route path="/" exact>
          <PostsContainer />
        </Route>
        <Route path="/q/:communityName(\w+)">
          <PostsContainer />
        </Route>
      </Switch>
    </>
  );
};

export default App;
