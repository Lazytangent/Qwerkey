import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useCollapsedSidebarContext } from "../../context/CollapsedSidebarContext";
import SearchBar from "../SearchBar";
import About from "../About";

const CollapsedSidebar = () => {
  const { showCollapsedSidebar } = useCollapsedSidebarContext();
  const popularCommunities = useSelector(state => state.sidebar.popular);
  const currentCommunity = useSelector(state => state.sidebar.community);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (popularCommunities) {
      setIsLoaded(true);
    }
  }, [popularCommunities]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 ${
        showCollapsedSidebar ? "w-52 md:w-0" : "w-0"
      } h-screen pt-12 overflow-x-hidden bg-gray-100 z-1 duration-500 dark:bg-gray-600 dark:text-gray-50`}
    >
      <div className="p-2">
        <h5>Navigation</h5>
        <ul>
          <li className="my-2">
            <NavLink
              className="p-4 align-middle hover:underline hover:text-purple-dark"
              to="/"
              exact={true}
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              className="p-4 align-middle hover:underline hover:text-purple-dark"
              to="/retailers"
              exact={true}
              activeClassName="active"
            >
              Retailers
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="p-2">Search</h5>
        <SearchBar />
      </div>
      <div className="">
        {currentCommunity && (
          <div className="p-2 border border-gray-600 rounded">
            <h5 className="text-center">{currentCommunity.name}</h5>
            <p className="p-2">{currentCommunity.description}</p>
          </div>
        )}
        <div className="p-2 mt-2 border border-gray-600 rounded">
          <h5>Top 5 Communities</h5>
          {popularCommunities.map((community) => (
            <div key={community.id} className="py-2">
              <span className="hover:text-green hover:underline">
                <NavLink to={`/q/${community.name}`}>{community.name}</NavLink>
              </span>
            </div>
          ))}
        </div>
        <About />
      </div>
    </div>
  );
};

export default CollapsedSidebar;
