import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import DarkModeToggle from "../../DarkModeToggle";
import LogoutButton from "../../LogoutButton";

const UserMenu = ({ createPostBtnHandler, userMenuRef }) => {
  const user = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
    }
  }, [user]);

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <div ref={userMenuRef} className="absolute -right-0.5 z-10 flex flex-col items-center p-2 bg-gray-200 rounded top-16 dark:bg-gray-600">
      <NavLink to={`/users/${user.id}`}><span className="hover:text-green hover:underline">{user.username}</span></NavLink>
      <DarkModeToggle />
      <LogoutButton />
    </div>
  );
};

export default UserMenu;
