import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import LoginModal from '../LoginForm';
import SignUpModal from '../SignUpForm';
import LogoutButton from '../LogoutButton';
import NavButton from '../parts/NavButton';

const NavBar = () => {
  const { setShowLoginModal, setShowSignUpModal, authenticated } = useAuthContext();

  const loginBtnClickHandler = () => {
    setShowLoginModal(prev => !prev);
  };

  const signUpBtnClickHandler = () => {
    setShowSignUpModal(prev => !prev);
  };

  return (
    <nav className="p-2 bg-green">
      <ul className="grid grid-cols-3">
        <div className="flex p-2">
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
        </div>
        {!authenticated && (
          <div className="flex justify-end col-start-3">
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
          <div className="flex justify-end col-start-3">
            <li>
              <LogoutButton />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
