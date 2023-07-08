import React from "react";

const LoginForm = function ({ submitLoginHandler }) {
  return (
    <div className="login-form">
      <h3 className="login-form__title">Login</h3>
      <p className="login-form__text">
        To continue, please enter your email address and password that you use for your account.
      </p>
      <form onSubmit={submitLoginHandler} className="login-form__form">
        <input className="_input" name="email" type="email" />
        <input className="_input" name="password" type="password" id="" />
        <button className="_button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
