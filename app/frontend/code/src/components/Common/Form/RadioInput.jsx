import React from "react";
import { useField } from "formik";

const RadioInput = ({ label, radioInputs, ...props }) => {
  const [field, meta] = useField(props);
  const radioInputsArr = JSON.parse(radioInputs);
  return (
    <>
      <label className="_input__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      {radioInputsArr.map((item) => {
        console.log(item);
        return (
          <div>
            <input
              type="radio"
              className="_radio"
              checked={field.value === item.value}
              onChange={field.onChange}
              {...field}
              {...{ value: item.value, ...props }}
            />
            <label for="low">{item.label}</label>
          </div>
        );
      })}
      {meta.touched && meta.error ? <div className="_input__error-message">{meta.error}</div> : null}
    </>
  );
};

export default RadioInput;
