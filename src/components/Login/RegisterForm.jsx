import React from "react";

const RegisterForm = function ({ submitRegisterHandler }) {
  return (
    <div className="login-form">
      <h3 className="login-form__title">Register</h3>
      <p className="login-form__text">Register with us.</p>
      <form onSubmit={submitRegisterHandler} className="login-form__form">
        Firstname
        <input className="_input" name="firstname" type="text" />
        Lastname
        <input className="_input" name="lastname" type="text" />
        Date of Birth
        <input className="_input" name="birth_date" type="date" id="" />
        Password
        <input className="_input" type="password" name="password" id="" />
        Email
        <input className="_input" type="email" name="email" id="" />
        <button className="_button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
