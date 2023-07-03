import React from "react";
import sendRequest from "../../api/sendRequest";
import { RESPONSE_JSON } from "../../api/sendRequest";

const Notes = function () {
  const submitNewNoteHandler = async (event) => {
    const formData = new FormData(event.target);
    event.preventDefault();
    // const formData = new FormData(event.target);
    const userData = {
      title: "TITLE",
      content: "SOME CONTENT",
    //   created_at: formData.get("firstname"),
      priority: 0,
    };
    try {
      //   const userToken = await register(userData);
      const relativeUrl = "api/create_note";
      const result = await sendRequest(null, userData, relativeUrl, RESPONSE_JSON);
      //   if (userToken) {
      //     setSuccessMessage("You have successfully registered your account");
      //     navigate("/");
      //   } else {
      //     setErrorMessage("Something went wrong. Check data");
      //   }
      console.log(result);
    } catch (error) {
      //   setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };
  return (
    <div className="notes-page">
      <form onSubmit={submitNewNoteHandler}>
        Notes
        {/* <input className="_input" name="birth_date" type="date" id="" /> */}
        <button type="submit">POST TEST</button>
      </form>
    </div>
  );
};

export default Notes;
