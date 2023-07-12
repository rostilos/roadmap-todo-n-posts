import React from "react";

function ErrorMessage({ error, touched, className }) {
  return (
    <div>
      {error && touched ? <div className={className ? className : "_input__error-message"}>{error}</div> : null}
    </div>
  );
}

export default ErrorMessage;
