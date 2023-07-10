import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../../Common/Form/ErrorMessage";
import useAppContext from "../../../../hook/useAppContext";

const EditUserSchema = Yup.object().shape({
  current_password: Yup.string().required("Enter your current password."),
  new_password: Yup.string()
    .required("No new password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
});

const EditUserPasswordForm = function () {
  const { updateUserPassword, setSuccessMessage, setErrorMessage } = useAppContext();

  const initialValues = {
    current_password: "",
    new_password: "",
  };

  const submitEditUserPasswordHandler = async (values) => {
    const { new_password, current_password } = values;
    try {
      const userToken = await updateUserPassword({ new_password, current_password });
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
      onSubmit={(values) => submitEditUserPasswordHandler(values)}
    >
      {({ errors, touched }) => (
        <Form className="edit-user__form">
          <label className="_input__label" htmlFor="current_password">
            Current Password
          </label>
          <Field
            className={`_input ${errors.current_password && touched.current_password ? "_input__error" : ""}`}
            name="current_password"
          />
          <ErrorMessage error={errors.current_password} touched={touched.current_password} />
          <label className="_input__label" htmlFor="new_password">
            New Password
          </label>
          <Field
            className={`_input ${errors.new_password && touched.new_password ? "_input__error" : ""}`}
            name="new_password"
          />
          <ErrorMessage error={errors.new_password} touched={touched.new_password} />

          <button className="_button" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserPasswordForm;
