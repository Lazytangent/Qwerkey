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

  return <button className="m-1 p-2 rounded bg-purple hover:bg-purple-dark hover:text-white" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
