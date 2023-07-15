import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../Common/Form/ErrorMessage";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("No password provided.").min(4, "Password is too short - should be 8 chars minimum."),
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
            <label className="_input__label" htmlFor="email">
              Email
            </label>
            <Field
              className={`_input ${errors.email && touched.email ? "_input__error" : ""}`}
              name="email"
              type="email"
            />
            <ErrorMessage error={errors.email} touched={touched.email} />

            <label className="_input__label" htmlFor="password">
              Password
            </label>
            <Field className={`_input ${errors.password && touched.password ? "_input__error" : ""}`} name="password" />
            <ErrorMessage error={errors.password} touched={touched.password} />

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
