import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../hook/useAppContext";
import LoginForm from "./LoginForm";
import LoginTabs from "./LoginTabs";
import RegisterForm from "./RegisterForm";

const Login = function () {
  const { ajaxLogin, register, setErrorMessage, setSuccessMessage } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
console.log('render');
  const submitLoginHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // rostilosfl@gmail.com; 123123qwe;
    try {
      const loginResponse = await ajaxLogin(userData);
      const loggedIn = !!loginResponse?.status;
      if (loggedIn) {
        setSuccessMessage("You are successfully logged in!");
        navigate("/");
      } else {
        setErrorMessage("Something went wrong. Check login data");
      }
      console.log(`login status: ${loggedIn}`);
    } catch (error) {
      // setPageLoader(false);
      console.error(error);
    }
  };
  const submitRegisterHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      password: formData.get("password"),
      birth_date: formData.get("birth_date"),
      email: formData.get("email"),
    };
    try {
      const userToken = await register(userData);
      if (userToken) {
        setSuccessMessage("You have successfully registered your account");
        navigate("/");
      } else {
        setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };
  const handleFormChange = (id) => {
    setActiveTab(id);
  };
  return (
    <div className="login-page">
      <LoginTabs changeHandler={handleFormChange} activeTab={activeTab} />
      <div className="login-page__content">
        {activeTab === 0 && <LoginForm submitLoginHandler={submitLoginHandler} />}
        {activeTab === 1 && <RegisterForm submitRegisterHandler={submitRegisterHandler} />}
      </div>
    </div>
  );
};

export default Login;
