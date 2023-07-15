import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../hook/useAppContext";
import LoginForm from "../../components/Login/Form/LoginForm";
import LoginTabs from "../../components/Login/LoginTabs";
import RegisterForm from "../../components/Login/Form/RegisterForm";

const Login = function () {
  const { ajaxLogin, register, setErrorMessage, setSuccessMessage } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const submitLoginHandler = async (values) => {
    try {
      const loginResponse = await ajaxLogin(values);
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
  const submitRegisterHandler = async (values) => {
    try {
      const userToken = await register(values);
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
