import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { Person, Menu } from "@material-ui/icons";

import { useAuthContext } from "../../context/AuthContext";
import { useCreatePostContext } from "../../context/CreatePostContext";
import { useCollapsedSidebarContext } from "../../context/CollapsedSidebarContext";
import LoginModal from "../LoginForm";
import SignUpModal from "../SignUpForm";
import NavButton from "../parts/NavButton";
import UserMenu from "../parts/UserMenu";
import SearchBar from "../SearchBar";
import DarkModeToggle from "../DarkModeToggle";
import CreatePostModal from "../CreatePostForm";

const NavBar = () => {
  const {
    setShowLoginModal,
    setShowSignUpModal,
    authenticated,
  } = useAuthContext();
  const { setShowCreatePostModal } = useCreatePostContext();
  const { setShowCollapsedSidebar } = useCollapsedSidebarContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();

  useEffect(() => {
    const closeUserMenu = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("click", closeUserMenu);
    }
    return () => document.removeEventListener("click", closeUserMenu);
  }, [showUserMenu]);

  useEffect(() => {
    if (!authenticated) {
      setShowUserMenu(false);
    }
  }, [authenticated]);

  const createPostBtnHandler = () => {
    setShowUserMenu(false);
    setShowCreatePostModal((prev) => !prev);
  };

  const loginBtnClickHandler = () => {
    setShowLoginModal((prev) => !prev);
  };

  const signUpBtnClickHandler = () => {
    setShowSignUpModal((prev) => !prev);
  };

  const openUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const toggleSidebar = () => {
    setShowCollapsedSidebar((prev) => !prev);
  };

  return (
    <nav className={`p-2 bg-green dark:bg-gray-500`}>
      <ul className="mx-auto max-w-screen-lg grid grid-cols-3 md:grid-cols-7">
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
          <li>
            <NavLink
              className="p-2 align-middle hover:underline hover:text-purple-dark"
              to="/q"
              exact={true}
              activeClassName="active"
            >
              Communities
            </NavLink>
          </li>
          <li>
            <NavLink
              className="p-2 align-middle hover:underline hover:text-purple-dark"
              to="/meetups"
              exact={true}
              activeClassName="active"
            >
              Meetups
            </NavLink>
          </li>
        </div>
        {!authenticated && (
          <div className="flex col-start-6 col-span-2">
            <DarkModeToggle />
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
          </div>
        )}
        {authenticated && (
          <div className="relative flex justify-center col-start-6 col-span-2">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <li className="relative">
              <div
                className="p-2 border rounded hover:border-purple dark:hover:border-green"
                onClick={openUserMenu}
              >
                <Person />
              </div>
            </li>
            {showUserMenu && (
              <UserMenu userMenuRef={userMenuRef} createPostBtnHandler={createPostBtnHandler} />
            )}
          </div>
        )}
        {authenticated && setShowCreatePostModal && (
          <CreatePostModal />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
