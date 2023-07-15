import React, { useEffect } from "react";
import _get from "lodash.get";

import { _emptyFunc } from "../../../utils";
import useAppContext from "../../../hook/useAppContext";

function Message() {
  const { message, setMessage } = useAppContext();
  const msg = _get(message, "message");
  const msgType = _get(message, "type");

  // auto-disappear message after some time.
  useEffect(() => {
    // don't auto-hide error messages
    if (!message || msgType === "error") {
      return _emptyFunc();
    }

    const timer = setTimeout(() => {
      setMessage(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [message, msgType, setMessage]);

  if (!message) {
    return <></>;
  }

  return (
    <div className="message">
      <div
        className={`message__content ${msgType === "error" ? "message__content--error" : ""} ${
          msgType === "success" ? "message__content--success" : ""
        }`}
      >
        <span className="">{msg}</span>
        <button
          type="button"
          className="message__close"
          onClick={() => setMessage(false)}
        >
          <span>×</span>
        </button>
      </div>
    </div>
  );
}

export default Message;
