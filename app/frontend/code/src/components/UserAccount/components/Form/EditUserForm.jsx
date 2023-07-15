import React from "react";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../../Common/Form/ErrorMessage";
import useAppContext from "../../../../hook/useAppContext";
import TextInput from "../../../Common/Form/TextInput";

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
  const { updateUser, setErrorMessage, setSuccessMessage } = useAppContext();

  const initialValues = {
    firstname,
    lastname,
    birth_date,
  };

  const submitEditUserHandler = async (values) => {
    const { firstname, lastname, birth_date } = values;
    try {
      const response = await updateUser({ firstname, lastname, birth_date });
      const { message, status } = response;
      if (status) {
        setSuccessMessage(message);
      } else {
        setErrorMessage(message || "Something went wrong. Check login data");
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
          <TextInput label="Firstname" className="_input _input--small-height" name="firstname" />
          <TextInput label="Lastname" className="_input _input--small-height" name="lastname" />

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
