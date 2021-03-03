import { NavLink } from 'react-router-dom';

import LogoutButton from '../LogoutButton';
import NavButton from '../parts/NavButton';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="bg-green">
      <ul className="grid grid-cols-3">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavButton name="Login" />
        </li>
        <li>
          <NavButton name="Sign Up" />
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
