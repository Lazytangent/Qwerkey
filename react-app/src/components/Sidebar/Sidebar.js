import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { useCreatePostContext } from "../../context/CreatePostContext";
import { getPopularCommunities } from "../../store/sidebar";
import About from "../About";
import CreatePostModal from "../CreatePostForm";
import NavButton from "../parts/NavButton";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const popularCommunities = useSelector((state) => state.sidebar.popular);
  const currentCommunity = useSelector((state) => state.sidebar.community);
  const user = useSelector((state) => state.session.user);

  const { setShowCreatePostModal } = useCreatePostContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPopularCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (popularCommunities) {
      setIsLoaded(true);
    }
  }, [popularCommunities]);

  const createPostBtnHandler = () => {
    setShowCreatePostModal((prev) => !prev);
  };

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
      {user && (
        <div className="flex justify-center p-2 mt-2 border border-gray-600 rounded">
          <NavButton name="Create Post" onClick={createPostBtnHandler}>
            <CreatePostModal />
          </NavButton>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
