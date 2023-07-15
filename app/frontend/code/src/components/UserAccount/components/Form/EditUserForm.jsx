import React from "react";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../../Common/Form/ErrorMessage";
import useAppContext from "../../../../hook/useAppContext";

const sixteen_years_ago = dayjs().subtract(16, "year").format("YYYY-MM-DD");

const EditUserSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastname: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  birth_date: Yup.date().max(sixteen_years_ago, "You must be at least 16 years old to register"),
});

const EditUserForm = function ({ userData }) {
  const { firstname, lastname, birth_date } = userData;
  const { updateUser, setSuccessMessage, setErrorMessage } = useAppContext();

  const initialValues = {
    firstname,
    lastname,
    birth_date,
  };

  const submitEditUserHandler = async (values) => {
    const { firstname, lastname, birth_date } = values;
    try {
      const userToken = await updateUser({ firstname, lastname, birth_date });
      if (userToken) {
        setSuccessMessage("You have successfully edited your account");
      } else {
        setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EditUserSchema}
      onSubmit={(values) => submitEditUserHandler(values)}
    >
      {({ errors, touched }) => (
        <Form className="edit-user__form">
          <label className="_input__label" htmlFor="firstname">
            Firstname
          </label>
          <Field
            className={`_input _input--small-height ${errors.firstname && touched.firstname ? "_input__error" : ""}`}
            name="firstname"
          />
          <ErrorMessage error={errors.firstname} touched={touched.firstname} />
          <label className="_input__label" htmlFor="lastname">
            Lastname
          </label>
          <Field className={`_input _input--small-height ${errors.lastname && touched.lastname ? "_input__error" : ""}`} name="lastname" />
          <ErrorMessage error={errors.lastname} touched={touched.lastname} />
          <label className="_input__label" htmlFor="birth_date">
            Date of Birth
          </label>
          <Field type="date" className="_input _input--small-height" name="birth_date" />
          <ErrorMessage error={errors.birth_date} touched={touched.birth_date} />

          <button className="_button" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
