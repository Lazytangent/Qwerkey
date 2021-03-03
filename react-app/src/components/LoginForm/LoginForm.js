import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { login } from '../../store/session';
import { useAuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const dispatch = useDispatch();

  const { setShowLoginModal, authenticated, setAuthenticated } = useAuthContext();
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(credential, password));
    if (!user.errors) {
      setAuthenticated(true);
      setShowLoginModal(false);
    } else {
      setErrors(user.errors);
    }
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={updateCredential}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
