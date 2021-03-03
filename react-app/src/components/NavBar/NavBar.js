import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import LoginModal from '../LoginForm';
import LogoutButton from '../LogoutButton';
import NavButton from '../parts/NavButton';

const NavBar = ({ setAuthenticated }) => {
  const { setShowLoginModal, setShowSignUpModal } = useAuthContext();

  const loginBtnClickHandler = () => {
    setShowLoginModal(prev => !prev);
  };

  const signUpBtnClickHandler = () => {
    setShowSignUpModal(prev => !prev);
  };

  return (
    <nav className="bg-green">
      <ul className="grid grid-cols-3">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavButton name="Login" onClick={loginBtnClickHandler}>
            <LoginModal />
          </NavButton>
        </li>
        <li>
          <NavButton name="Sign Up" onClick={signUpBtnClickHandler} />
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
