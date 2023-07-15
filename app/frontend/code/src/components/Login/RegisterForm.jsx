import React from "react";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../Common/Form/ErrorMessage";

const sixteen_years_ago = dayjs().subtract(16, "year").format("YYYY-MM-DD");

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastname: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  birth_date: Yup.date().max(sixteen_years_ago, "You must be at least 16 years old to register"),
  password: Yup.string().required("No password provided.").min(6, "Password is too short - should be 6 chars minimum."),
  email: Yup.string().required("No email provided.").email("Invalid email"),
});

const initialValues = {
  firstname: "",
  lastname: "",
  birth_date: "",
  password: "",
  email: "",
};

const RegisterForm = function ({ submitRegisterHandler }) {
  return (
    <div className="login-form">
      <h3 className="login-form__title">Register</h3>
      <p className="login-form__text">Register with us.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values) => submitRegisterHandler(values)}
      >
        {({ errors, touched }) => (
          <Form className="login-form__form">
            <label className="_input__label" htmlFor="firstname">Firstname</label>
            <Field
              className={`_input ${errors.firstname && touched.firstname ? "_input__error" : ""}`}
              name="firstname"
            />
            <ErrorMessage error={errors.firstname} touched={touched.firstname} />

            <label className="_input__label" htmlFor="lastname">Lastname</label>
            <Field className={`_input ${errors.lastname && touched.lastname ? "_input__error" : ""}`} name="lastname" />
            <ErrorMessage error={errors.lastname} touched={touched.lastname} />

            <label className="_input__label" htmlFor="birth_date">Date of Birth</label>
            <Field type="date" className="_input" name="birth_date" />
            <ErrorMessage error={errors.birth_date} touched={touched.birth_date} />

            <label className="_input__label" htmlFor="password">Password</label>
            <Field className={`_input ${errors.password && touched.password ? "_input__error" : ""}`} name="password" />
            <ErrorMessage error={errors.password} touched={touched.password} />

            <label className="_input__label" htmlFor="email">Email</label>
            <Field
              className={`_input ${errors.email && touched.email ? "_input__error" : ""}`}
              name="email"
              type="email"
            />
            <ErrorMessage error={errors.email} touched={touched.email} />

            <button className="_button" type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
