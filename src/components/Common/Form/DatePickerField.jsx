import { useField, useFormikContext } from "formik";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerField = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <div className="_datepicker">
      <label className="_input__label" htmlFor={props.id || props.name}>
        {label}
        <div>
          <small style={{ color: "#7B8794" }}>*you can enter the date with the keyboard</small>
        </div>
      </label>
      <Datepicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        style={{ display: "block" }}
      />
      {meta.touched && meta.error ? <div className="_input__error-message">{meta.error}</div> : null}
    </div>
  );
};
export default DatepickerField;
