import React from "react";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../Common/Form/TextInput";

const sixteen_years_ago = dayjs().subtract(16, "year").format("YYYY-MM-DD");

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastname: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  birth_date: Yup.date().required("No date of birth provided.").max(sixteen_years_ago, "You must be at least 16 years old to register"),
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
            <TextInput label="Firstname" name="firstname" />
            <TextInput label="Lastname" name="lastname" />
            <TextInput type="date" label="Date of Birth" name="birth_date" />
            <TextInput label="Password" name="password" />
            <TextInput label="Email" name="email" />

            <button className="_button" type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
