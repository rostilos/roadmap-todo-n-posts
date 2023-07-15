import React from "react";
import { useField } from "formik";

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="_input__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className={`_textarea ${meta.touched && meta.error ? "_textarea__error" : ""}`} {...field} {...props} />
      {meta.touched && meta.error ? <div className="_textarea__error-message">{meta.error}</div> : null}
    </>
  );
};

export default TextArea;
