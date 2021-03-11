import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login, demoUserLogin } from "../../store/session";
import { useAuthContext } from "../../context/AuthContext";
import FormTitle from '../parts/FormTitle';
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    setShowLoginModal,
    setShowSignUpModal,
    authenticated,
    setAuthenticated,
  } = useAuthContext();
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
    <div className="p-4 bg-white rounded dark:bg-gray-800 dark:text-gray-50">
      <form className="p-2 bg-white rounded dark:bg-gray-800 dark:text-gray-50" onSubmit={onLogin}>
        <FormTitle title="Login" />
        {errors.length > 0 && (
          <div className="flex justify-center text-red-600">
            <h5>The provided credentials were invalid.</h5>
          </div>
        )}
        <InputField
          name="credential"
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={updateCredential}
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <SubmitFormButton label="Login" />
      </form>
      <div className="text-center">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={openSignUp}
        >
          Sign Up Here.
        </span>
      </div>
      <div className="text-center">
        Want to try out our app?{" "}
        <span
          className="cursor-pointer text-green hover:underline"
          onClick={demoLogin}
        >
          Sign In as a Demo account.
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
