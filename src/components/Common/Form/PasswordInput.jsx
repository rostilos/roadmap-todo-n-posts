import React, { useState } from "react";
import { useField } from "formik";
import eye from "../../../assets/images/common/eye.svg";
import closedEye from "../../../assets/images/common/eye-closed.svg";

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="_input__label" htmlFor={props.id || props.name}>
        {label}
      </label>

      <div className={`_input-wrapper--password`}>
        <input
          type={showPassword ? "text" : "password"}
          className={`_input ${meta.touched && meta.error ? "_input__error" : ""}`}
          {...field}
          {...props}
        />
        <button
          type="button"
          title="Show/Hide password"
          className="_input__password-show"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src={showPassword ? closedEye : eye} alt="Show/Hide password" />
        </button>
      </div>

      {meta.touched && meta.error ? <div className="_input__error-message">{meta.error}</div> : null}
    </>
  );
};

export default PasswordInput;
