import React from "react";
import register from "../../api/user/register/register";
import ajaxLogin from "../../api/user/login";

const Login = function () {
  const submitLoginHandler = () => {
    const loginData = {
      email: "rostilosfl@gmail.com",
      password: "123123qwe",
    };
    ajaxLogin(loginData);
  };
  const submitHandler = () => {
    const user = {
      firstname: "Rostislav",
      lastname: "Sulejmanov",
      password: "123123qwe",
      birth_date: "15/09/1999",
      email: "rostilosfl@gmail.com",
    };
    register(user);
  };
  return (
    <div>
      <h1>Login</h1>
      <br />
      <form>
        <input type="text" />
        <br />
        <input type="password" name="" id="" />
        <button onClick={submitLoginHandler} type="button">
          Login
        </button>
      </form>
      <h1>Register</h1>
      <br />
      <form>
        Firstname
        <input type="text" />
        <br />
        Lastname
        <input type="text" />
        <br />
        Date of Birth
        <input type="date" name="date" id="" />
        <br />
        Password
        <input type="password" name="password" id="" />
        <br />
        Email
        <input type="email" name="email" id="" />
        <button onClick={submitHandler} type="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
