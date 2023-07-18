import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useAppContext from "../../../../hook/useAppContext";
import PasswordInput from "../../../Common/Form/PasswordInput";

const EditUserSchema = Yup.object().shape({
  current_password: Yup.string().required("Enter your current password."),
  new_password: Yup.string()
    .required("No new password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
});

const EditUserPasswordForm = function () {
  const { updateUserPassword, setErrorMessage, setSuccessMessage } = useAppContext();

  const initialValues = {
    current_password: "",
    new_password: "",
  };

  const submitEditUserPasswordHandler = async (values) => {
    const { new_password, current_password } = values;
    try {
      const response = await updateUserPassword({ new_password, current_password });
      const { status, message } = response;
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
      onSubmit={(values) => submitEditUserPasswordHandler(values)}
    >
      {({ errors, touched }) => (
        <Form className="edit-user__form">
          <PasswordInput className="_input _input--small-height" label="Current Password" name="current_password" />
          <PasswordInput className="_input _input--small-height" label="New Password" name="new_password" />

          <button className="_button" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserPasswordForm;
