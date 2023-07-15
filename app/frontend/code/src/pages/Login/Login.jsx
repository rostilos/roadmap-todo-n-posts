import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../hook/useAppContext";
import LoginForm from "../../components/Login/LoginForm";
import LoginTabs from "../../components/Login/LoginTabs";
import RegisterForm from "../../components/Login/RegisterForm";

const Login = function () {
  const { ajaxLogin, register, setErrorMessage, setSuccessMessage } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const submitLoginHandler = async (values) => {
    try {
      const loginResponse = await ajaxLogin(values);
      const { status, message } = loginResponse;
      const loggedIn = !!status;

      if (loggedIn) {
        setSuccessMessage(message);
        navigate("/");
      } else {
        setErrorMessage(message || "Something went wrong. Check login data");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Check login data");
      console.error(error);
    }
  };
  const submitRegisterHandler = async (values) => {
    try {
      const response = await register(values);
      const { status, message, userToken } = response;

      if (userToken && status) {
        setSuccessMessage(message);
        navigate("/");
      } else {
        setErrorMessage(message || "Something went wrong. Check login data");
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
