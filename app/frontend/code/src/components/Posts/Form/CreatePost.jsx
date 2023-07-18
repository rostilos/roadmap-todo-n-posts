import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "../../Common/Form/TextArea";
import TextInput from "../../Common/Form/TextInput";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("No title provided."),
  content: Yup.string().required("No content provided."),
});

const initialValues = {
  title: "",
  content: "",
};
const CreatePost = function ({ submitCreatePostForm, setShowCreatePostForm, showCreatePostForm }) {
  return (
    <div className="_form-popup">
      <div className="_form-popup__overlay" onClick={() => setShowCreatePostForm(false)}></div>
      <div className={`_form-popup__body _section ${showCreatePostForm ? "active" : ""}`}>
        <h1 className="page__title">Create new post</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={PostSchema}
          onSubmit={(values) => submitCreatePostForm(values)}
        >
          {({ errors, touched }) => (
            <Form className="_form-popup__form">
              <TextInput label="title" name="title" />
              <TextArea label="Content" name="content" rows="6" />

              <button className="_button" type="submit">
                Create
              </button>
            </Form>
          )}
        </Formik>
        <button type="button" className="_form-popup__close" onClick={() => setShowCreatePostForm(false)}></button>
      </div>
    </div>
  );
};

export default CreatePost;
