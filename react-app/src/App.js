import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";
import { useDarkModeContext } from "./context/DarkModeContext";
import { useCollapsedSidebarContext } from "./context/CollapsedSidebarContext";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";
import PostsContainer from "./components/PostsContainer";
import PostPage from "./components/PostPage";
import RetailersContainer from "./components/RetailersContainer";
import RetailerPage from "./components/RetailerPage";
import SearchResults from "./components/SearchResults";
import PageNotFound from "./components/PageNotFound";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import CollapsedSidebar from "./components/CollpasedSidebar";

const App = () => {
  const dispatch = useDispatch();

  const { setAuthenticated } = useAuthContext();
  const { isDarkMode } = useDarkModeContext();
  const { showCollapsedSidebar } = useCollapsedSidebarContext();
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
    <>
      <CollapsedSidebar />
      <div className={`grid grid-rows-layout ${isDarkMode ? "dark bg-gray-800" : ""} ${showCollapsedSidebar ? "ml-40" : "ml-0"} duration-500`}>
        <div className="row-span-1">
          <NavBar setAuthenticated={setAuthenticated} />
        </div>
        <div className="p-2 mx-auto dark:text-gray-50 max-w-screen-lg md:grid md:grid-cols-3 row-span-1">
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
              <Route path="/retailers" exact={true}>
                <RetailersContainer />
              </Route>
              <Route path="/retailers/:retailerId(\d+)">
                <RetailerPage />
              </Route>
              <Route path="/search">
                <SearchResults />
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
    </>
  );
};

export default App;
