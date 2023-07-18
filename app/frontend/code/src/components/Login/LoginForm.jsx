import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../Common/Form/TextInput";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("No password provided."),
  email: Yup.string().required("No email provided.").email("Invalid email"),
});

const initialValues = {
  password: "",
  email: "",
};

const LoginForm = function ({ submitLoginHandler }) {
  return (
    <div className="login-form">
      <h3 className="login-form__title">Login</h3>
      <p className="login-form__text">
        To continue, please enter your email address and password that you use for your account.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => submitLoginHandler(values)}
      >
        {({ errors, touched }) => (
          <Form className="login-form__form">
            <TextInput label="Email" className="_input" type="email" name="email" />
            <TextInput label="Password" className="_input" type="password" name="password" />

            <button className="_button" type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
