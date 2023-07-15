import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../../Common/Form/TextInput";
import TextArea from "../../../Common/Form/TextArea";
// import RadioInput from "../../../Common/Form/RadioInput";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("No title provided."),
  content: Yup.string().required("No content provided."),
});

const initialValues = {
  title: "",
  content: "",
};

// const radioInputs = JSON.stringify([
//   { value: 0, label: "Low" },
//   { value: 1, label: "Medium" },
//   { value: 2, label: "High" },
// ]);

const CreateNote = function ({ submitCreateNoteForm, setShowNewNoteForm, showNewNoteForm }) {
  return (
    <div className="_form-popup">
      <div className="_form-popup__overlay" onClick={() => setShowNewNoteForm(false)}></div>
      <div className={`_form-popup__body _section ${showNewNoteForm ? "active" : ""}`}>
        <h1 className="page__title">Add new note</h1>
        <Formik initialValues={initialValues} validationSchema={NoteSchema} onSubmit={submitCreateNoteForm}>
          {({ errors, touched }) => (
            <Form className="_form-popup__form">
              <TextInput label="Title" name="title" />
              <TextArea label="Content" name="content" rows="6" />

              {/* <RadioInput label="Priority" name="priority" radioInputs={radioInputs} /> */}
              <p>Priority</p>
              <div className="_form-popup__priority">
                <div>
                  <input type="radio" className="_radio" id="low" name="priority" value="0" />
                  <label for="low">Low</label>
                </div>
                <div>
                  <input type="radio" className="_radio" id="medium" name="priority" value="1" />
                  <label for="medium">Medium</label>
                </div>
                <div>
                  <input type="radio" className="_radio" id="high" name="priority" value="2" />
                  <label for="high">High</label>
                </div>
              </div>
              <button className="_button" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <button type="button" className="_form-popup__close" onClick={() => setShowNewNoteForm(false)}>
          x
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
