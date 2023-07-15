import React from "react";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="_input__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        type={props.type ? props.type : "text"}
        className={`_input ${meta.touched && meta.error ? "_input__error" : ""}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className="_input__error-message">{meta.error}</div> : null}
    </>
  );
};

export default TextInput;
