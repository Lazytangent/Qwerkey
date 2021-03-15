import { useDispatch } from 'react-redux';

import { logout } from '../../store/session';
import { useAuthContext } from '../../context/AuthContext';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { setAuthenticated } = useAuthContext();

  const onLogout = async () => {
    await dispatch(logout());
    setAuthenticated(false);
  };

  return <button className="p-2 m-1 rounded focus:outline-none duration-300 bg-purple hover:bg-purple-dark hover:text-white" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
