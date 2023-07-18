import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextArea from "../../../Common/Form/TextArea";
import TextInput from "../../../Common/Form/TextInput";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("No title provided."),
  content: Yup.string().required("No content provided."),
});

const initialValues = {
  title: "",
  content: "",
  priority: String(0),
};

const CreateNote = function ({ submitCreateNoteForm, setShowNewNoteForm, showNewNoteForm }) {
  return (
    <div className="_form-popup">
      <div className="_form-popup__overlay" onClick={() => setShowNewNoteForm(false)}></div>
      <div className={`_form-popup__body _section ${showNewNoteForm ? "active" : ""}`}>
        <h1 className="page__title">Add new note</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={NoteSchema}
          onSubmit={(values) => submitCreateNoteForm(values)}
        >
          {({ errors, touched }) => (
            <Form className="_form-popup__form">
              <TextInput label="Title" name="title" />
              <TextArea label="Content" name="content" rows="6" />
              <div className="_form-popup__priority">
                <div>
                  <Field type="radio" id="low" name="priority" defaultChecked="true" className="_radio" value="0" />
                  <label for="low">Low</label>
                </div>
                <div>
                  <Field type="radio" id="medium" name="priority" className="_radio" value="1" />
                  <label for="medium">Medium</label>
                </div>
                <div>
                  <Field type="radio" id="high" name="priority" className="_radio" value="2" />
                  <label for="high">High</label>
                </div>
              </div>
              <button className="_button" type="submit">
                Create
              </button>
            </Form>
          )}
        </Formik>
        <button type="button" className="_form-popup__close" onClick={() => setShowNewNoteForm(false)}></button>
      </div>
    </div>
  );
};

export default CreateNote;
