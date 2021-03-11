import { NavLink } from "react-router-dom";

import { useCollapsedSidebarContext } from "../../context/CollapsedSidebarContext";
import SearchBar from "../SearchBar";

const CollapsedSidebar = () => {
  const { showCollapsedSidebar } = useCollapsedSidebarContext();

  return (
    <div
      className={`fixed top-0 left-0 ${
        showCollapsedSidebar ? "w-40 md:w-0" : "w-0"
      } h-screen pt-12 overflow-x-hidden bg-gray-100 z-1 duration-500`}
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
      <SearchBar />
    </div>
  );
};

export default CollapsedSidebar;
