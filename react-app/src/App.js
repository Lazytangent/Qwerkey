import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";
import { useDarkModeContext } from "./context/DarkModeContext";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";
import PostsContainer from "./components/PostsContainer";
import PostPage from "./components/PostPage";
import PageNotFound from "./components/PageNotFound";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();

  const { setAuthenticated } = useAuthContext();
  const { isDarkMode } = useDarkModeContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [setAuthenticated, dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className={`grid grid-rows-layout ${isDarkMode ? "dark" : ""}`}>
      <div className="row-span-1">
        <NavBar setAuthenticated={setAuthenticated} />
      </div>
      <div className="p-2 mx-auto max-w-screen-lg md:grid md:grid-cols-3 row-span-1">
        <div className="col-span-2">
          <Switch>
            <Route path="/" exact>
              <PostsContainer />
            </Route>
            <Route path="/q/:communityName/:postId(\d+)">
              <PostPage />
            </Route>
            <Route path="/q/:communityName" exact={true}>
              <PostsContainer />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
        <div className="hidden p-2 col-span-1 md:block">
          <Sidebar />
        </div>
      </div>
      <div className="row-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default App;
