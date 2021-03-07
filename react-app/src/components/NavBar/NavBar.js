import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { useCreatePostContext } from "../../context/CreatePostContext";
import LoginModal from "../LoginForm";
import SignUpModal from "../SignUpForm";
import LogoutButton from "../LogoutButton";
import CreateFormModal from "../CreatePostForm";
import DarkModeToggle from "../DarkModeToggle";
import NavButton from "../parts/NavButton";

const NavBar = () => {
  const {
    setShowLoginModal,
    setShowSignUpModal,
    authenticated,
  } = useAuthContext();
  const { setShowCreatePostModal } = useCreatePostContext();

  const createPostBtnHandler = () => {
    setShowCreatePostModal((prev) => !prev);
  };

  const loginBtnClickHandler = () => {
    setShowLoginModal((prev) => !prev);
  };

  const signUpBtnClickHandler = () => {
    setShowSignUpModal((prev) => !prev);
  };

  return (
    <nav className="p-2 bg-green">
      <ul className="grid grid-cols-3">
        <div className="flex p-2">
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
              <li>
                <NavButton name="Create Post" onClick={createPostBtnHandler}>
                  <CreateFormModal />
                </NavButton>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
