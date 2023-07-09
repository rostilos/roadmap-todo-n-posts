import React from "react";

function ErrorMessage({ error, touched }) {
  return <div>{error && touched ? <div className="_input__error-message">{error}</div> : null}</div>;
}

export default ErrorMessage;
