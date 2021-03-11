import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Person, Menu } from "@material-ui/icons";

import { useAuthContext } from "../../context/AuthContext";
import { useCreatePostContext } from "../../context/CreatePostContext";
import { useCollapsedSidebarContext } from "../../context/CollapsedSidebarContext";
import LoginModal from "../LoginForm";
import SignUpModal from "../SignUpForm";
import LogoutButton from "../LogoutButton";
import CreatePostModal from "../CreatePostForm";
import DarkModeToggle from "../DarkModeToggle";
import NavButton from "../parts/NavButton";
import UserMenu from "../parts/UserMenu";
import SearchBar from "../SearchBar";

const NavBar = () => {
  const {
    setShowLoginModal,
    setShowSignUpModal,
    authenticated,
  } = useAuthContext();
  const { setShowCreatePostModal } = useCreatePostContext();
  const { setShowCollapsedSidebar } = useCollapsedSidebarContext();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const createPostBtnHandler = () => {
    setShowCreatePostModal((prev) => !prev);
  };

  const loginBtnClickHandler = () => {
    setShowLoginModal((prev) => !prev);
  };

  const signUpBtnClickHandler = () => {
    setShowSignUpModal((prev) => !prev);
  };

  const openUserMenu = () => {
    setShowUserMenu(prev => !prev);
  };

  const toggleSidebar = () => {
    setShowCollapsedSidebar(prev => !prev);
  };

  return (
    <nav className={`p-2 bg-green dark:bg-gray-500`}>
      <ul className="grid grid-cols-7">
        <div className="p-2 md:hidden" onClick={toggleSidebar}>
          <Menu />
        </div>
        <div className="hidden p-2 md:flex">
          <li>
            <NavLink
              className="p-2 align-middle hover:underline hover:text-purple-dark"
              to="/"
              exact={true}
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="p-2 align-middle hover:underline hover:text-purple-dark"
              to="/retailers"
              exact={true}
              activeClassName="active"
            >
              Retailers
            </NavLink>
          </li>
        </div>
        <div className="flex justify-end col-start-4 col-span-4">
          {authenticated &&
            <div className="hidden md:block">
              <SearchBar />
           </div>
          }
          <div className="hidden md:block">
            <DarkModeToggle />
          </div>
          {!authenticated && (
            <>
              <li>
                <NavButton name="Login" onClick={loginBtnClickHandler}>
                  <LoginModal />
                </NavButton>
              </li>
              <li>
                <NavButton name="Sign Up" onClick={signUpBtnClickHandler}>
                  <SignUpModal />
                </NavButton>
              </li>
            </>
          )}
          {authenticated && (
            <>
              <li className="relative md:hidden">
                <div className="p-2" onClick={openUserMenu}>
                  <Person />
                </div>
              </li>
              {showUserMenu && (
                <UserMenu createPostBtnHandler={createPostBtnHandler} />
              )}
              <div className="hidden md:flex">
                <li>
                  <NavButton name="Create Post" onClick={createPostBtnHandler}>
                    <CreatePostModal />
                  </NavButton>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </div>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
