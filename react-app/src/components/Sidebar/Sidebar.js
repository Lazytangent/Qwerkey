import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";

import { getSidebarCommunity, getSidebarPopularCommunities } from "../../store/sidebar";
import About from "../About";

const Sidebar = () => {
  const location = useLocation();
  const { communityName } = useParams();

  const dispatch = useDispatch();
  const popularCommunities = useSelector((state) => state.sidebar.popular.map((id) => state.communities[id]));
  const currentCommunity = useSelector((state) => state.communities[state.sidebar.community]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSidebarPopularCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (communityName && !currentCommunity) {
      dispatch(getSidebarCommunity(communityName));
    }
  }, [dispatch, communityName, currentCommunity]);

  useEffect(() => {
    if (popularCommunities) {
      setIsLoaded(true);
    }
  }, [popularCommunities]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="fixed max-w-xs p-2 pt-0">
      {location.pathname.startsWith("/q") && currentCommunity && (
        <div className="max-w-md p-2 border border-gray-600 rounded">
          <h3 className="text-center">{currentCommunity.name}</h3>
          <p className="p-2">{currentCommunity.description}</p>
        </div>
      )}
      <div className="p-2 mt-2 border border-gray-600 rounded">
        <h3>Top 5 Communities</h3>
        {popularCommunities.map((community) => (
          <div key={community.id} className="p-2">
            <span className="hover:text-green hover:underline">
              <NavLink to={`/q/${community.name}`}>{community.name}</NavLink>
            </span>
          </div>
        ))}
      </div>
      <About />
    </div>
  );
};

export default Sidebar;
