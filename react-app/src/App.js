import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { useAuthContext } from './context/AuthContext';
import { authenticate } from './store/session';
import { getPosts } from './store/posts';
import NavBar from './components/NavBar';
import PostsContainer from './components/PostsContainer';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();
  const { setAuthenticated } = useAuthContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      await dispatch(getPosts(1));
      setLoaded(true);
    })();
  }, [setAuthenticated, dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="grid grid-rows-layout">
      <div className="row-span-1">
        <NavBar setAuthenticated={setAuthenticated} />
      </div>
      <div className="row-span-1">
        <Switch>
          <Route path="/" exact>
            <PostsContainer />
          </Route>
          <Route path="/q/:communityName(\w+)">
            <PostsContainer />
          </Route>
        </Switch>
        <Sidebar />
      </div>
      <div className="row-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default App;
