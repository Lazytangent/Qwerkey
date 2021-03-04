import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { login, demoUserLogin } from '../../store/session';
import { useAuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const dispatch = useDispatch();

  const { setShowLoginModal, setShowSignUpModal, authenticated, setAuthenticated } = useAuthContext();
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

  const openSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const demoLogin = () => {
    dispatch(demoUserLogin());
    setShowLoginModal(false);
    setAuthenticated(true);
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
    <div className="p-4 bg-white rounded">
      <form className="p-2 bg-white rounded" onSubmit={onLogin}>
        <div className="flex justify-center p-2">
          <h3>Login</h3>
        </div>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="flex justify-center p-2">
          <input
            className="w-3/4 p-2 mb-1 border rounded"
            name="email"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={updateCredential}
          />
        </div>
        <div className="flex justify-center p-2">
          <input
            className="w-3/4 p-2 mb-2 border rounded"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="flex justify-center p-2">
          <button type="submit" className="p-2 border rounded hover:border-green">Login</button>
        </div>
      </form>
      <div className="text-center">
        Don't have an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={openSignUp}>Sign Up Here.</span>
      </div>
      <div className="text-center">
        Want to try out our app? <span className="cursor-pointer text-green hover:underline" onClick={demoLogin}>Sign In as a Demo account.</span>
      </div>
    </div>
  );
};

export default LoginForm;
