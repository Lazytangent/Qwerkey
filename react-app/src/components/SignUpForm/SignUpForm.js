import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signUp, demoUserLogin } from '../../store/session';
import { useAuthContext } from '../../context/AuthContext';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const { setShowLoginModal, setShowSignUpModal, authenticated, setAuthenticated } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp(username, email, password));
      if (!user.errors) {
        setAuthenticated(true);
        setShowSignUpModal(false);
      } else {
        setErrors(user.errors);
      }
    }
  };

  const demoLogin = () => {
    dispatch(demoUserLogin());
    setShowSignUpModal(false);
    setAuthenticated(true);
  };

  const openLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="p-4 bg-white rounded">
      <form onSubmit={onSignUp} className="p-2 bg-white rounded">
        <div className="flex justify-center p-2">
          <h3>Sign Up</h3>
        </div>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="flex justify-center p-2">
          <input
            type="text"
            className="w-3/4 p-2 mb-1 border rounded"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div className="flex justify-center p-2">
          <input
            className="w-3/4 p-2 mb-1 border rounded"
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div className="flex justify-center p-2">
          <input
            className="w-3/4 p-2 mb-1 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div className="flex justify-center p-2">
          <input
            className="w-3/4 p-2 mb-1 border rounded"
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="flex justify-center p-2">
          <button type="submit" className="p-2 border rounded hover:border-green">Sign Up</button>
        </div>
      </form>
      <div className="text-center">
        Already have an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={openLogin}>Log In Here.</span>
      </div>
      <div className="text-center">
        Want to try out our app? <span className="cursor-pointer text-green hover:underline" onClick={demoLogin}>Sign In as a Demo account.</span>
      </div>
    </div>
  );
};

export default SignUpForm;
