import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getPopularCommunities } from "../../store/sidebar";
import About from "../About";

const Sidebar = () => {
  const dispatch = useDispatch();
  const popularCommunities = useSelector((state) => state.sidebar.popular);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPopularCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (popularCommunities) {
      setIsLoaded(true);
    }
  }, [popularCommunities]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <div className="p-2">
        <h3>Top 5 Communities</h3>
        {popularCommunities.map((community) => (
          <div className="p-2">
            <span className="hover:text-green hover:underline">
              <NavLink to={`/q/${community.name}`}>{community.name}</NavLink>
            </span>
          </div>
        ))}
      </div>
      <About />
    </>
  );
};

export default Sidebar;
