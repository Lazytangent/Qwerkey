import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Person, Menu } from "@material-ui/icons";

import { useAuthContext } from "../../context/AuthContext";
import { useCreatePostContext } from "../../context/CreatePostContext";
import LoginModal from "../LoginForm";
import SignUpModal from "../SignUpForm";
import LogoutButton from "../LogoutButton";
import CreateFormModal from "../CreatePostForm";
import DarkModeToggle from "../DarkModeToggle";
import NavButton from "../parts/NavButton";
import UserMenu from "../parts/UserMenu";

const NavBar = () => {
  const {
    setShowLoginModal,
    setShowSignUpModal,
    authenticated,
  } = useAuthContext();
  const { setShowCreatePostModal } = useCreatePostContext();
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

  return (
    <nav className="p-2 bg-green dark:bg-gray-500">
      <ul className="grid grid-cols-3">
        <div className="p-2 md:hidden">
          <Menu />
        </div>
        <div className="flex hidden p-2 md:block">
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
        <div className="flex justify-end col-start-3">
          <DarkModeToggle />
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
                <UserMenu />
              )}
              <div className="hidden md:block">
                <li>
                  <NavButton name="Create Post" onClick={createPostBtnHandler}>
                    <CreateFormModal />
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
