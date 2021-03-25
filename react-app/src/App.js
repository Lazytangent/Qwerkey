import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";
import { useDarkModeContext } from "./context/DarkModeContext";
import { useCollapsedSidebarContext } from "./context/CollapsedSidebarContext";
import { useSearchContext } from "./context/SearchContext";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";
import PostsContainer from "./components/PostsContainer";
import PostPage from "./components/PostPage";
import RetailersContainer from "./components/RetailersContainer";
import RetailerPage from "./components/RetailerPage";
import SearchResults from "./components/SearchResults";
import PageNotFound from "./components/PageNotFound";
import Sidebar from "./components/Sidebar";
import CollapsedSidebar from "./components/CollpasedSidebar";
import CommunitiesContainer from "./components/CommunitiesContainer";
import ProfilePage from "./components/ProfilePage";
import UserNotFound from "./components/UserNotFound";
import MeetupsContainer from "./components/MeetupsContainer";
import MeetupPage from "./components/MeetupPage";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { setAuthenticated } = useAuthContext();
  const { isDarkMode } = useDarkModeContext();
  const { showCollapsedSidebar } = useCollapsedSidebarContext();
  const { setSearchInput } = useSearchContext();
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

  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchInput("");
    }
  }, [location, setSearchInput]);

  if (!loaded) {
    return null;
  }

  return (
    <div className={`max-w-screen ${isDarkMode ? "dark bg-gray-800" : ""}`}>
      <CollapsedSidebar />
      <div className={`grid grid-rows-layout ${isDarkMode ? "dark bg-gray-800" : ""} ${showCollapsedSidebar ? "ml-52 md:ml-0" : "ml-0"} duration-500`}>
        <div className="z-10 w-screen row-span-1">
          <NavBar setAuthenticated={setAuthenticated} />
        </div>
        <div className="relative w-screen p-2 mx-auto row-span-1 dark:text-gray-50 max-w-screen-lg md:grid md:grid-cols-3">
          <div className="col-span-2">
            <Switch>
              <Route path="/" exact>
                <PostsContainer />
              </Route>
              <Route path="/q/:communityName/:postId(\d+)">
                <PostPage />
              </Route>
              <Route path="/q/:communityName">
                <PostsContainer />
              </Route>
              <Route path="/q" exact={true}>
                <CommunitiesContainer />
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
              <Route path="/users/:userId(\d+)">
                <ProfilePage />
              </Route>
              <Route path="/users/not-found">
                <UserNotFound />
              </Route>
              <Route path="/meetups" exact>
                <MeetupsContainer />
              </Route>
              <Route path="/meetups/:meetupId(\d+)">
                <MeetupPage />
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
      </div>
    </div>
  );
};

export default App;
