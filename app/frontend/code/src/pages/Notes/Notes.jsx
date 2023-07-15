import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import useNotesContext from "../../hook/useNotesContext";
import CreateNote from "../../components/Notes/components/Form/CreateNote";
import NotesList from "../../components/Notes/components/NotesList";
import EditNote from "../../components/Notes/components/Form/EditNote";
import NoteTabs from "../../components/Notes/components/NoteTabs";
import useAppContext from "../../hook/useAppContext";

const notePriorityIds = {
  2: "Important",
  1: "Medium priority",
  0: "Low priority",
  3: "All",
};

const Notes = function () {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [editNoteData, setEditNoteData] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);

  const { createNote, fetchNotes, userNotes, editNote, deleteNote } = useNotesContext();
  const { setSuccessMessage, setErrorMessage } = useAppContext();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes =
    activeTabId === 3
      ? userNotes
      : Object.keys(userNotes)
          .filter((key) => userNotes[key].priority === activeTabId)
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: userNotes[key],
            });
          }, {});

  const submitCreateNoteForm = async (values) => {
    try {
      const status = await createNote(values);
      if (status) {
        setShowNewNoteForm(false);
        setSuccessMessage("You have successfully added a new note");
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.error(error);
    }
  };

  const submitEditNoteForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteData = {
      id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
      priority: formData.get("priority"),
    };
    try {
      const status = await editNote(noteData);
      if (status) {
        setEditNoteData(null);
        // setSuccessMessage("You have successfully registered your account");
        // navigate("/");
      } else {
        // setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      // setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };

  const deleteNoteRequest = async (id) => {
    try {
      const status = await deleteNote({ id: id });
      if (status) {
        // setSuccessMessage("You have successfully registered your account");
        // navigate("/");
      } else {
        // setErrorMessage("Something went wrong. Check data");
      }
    } catch (error) {
      // setErrorMessage("Something went wrong. Check data");
      console.error(error);
    }
  };

  const handleFilterChange = (id) => {
    setActiveTabId(id);
  };

  return (
    <div className="notes-page">
      <div className="notes-page__content _section">
        <h1 className="page__title">Sorting by priority:</h1>

        <NoteTabs changeHandler={handleFilterChange} activeTab={activeTabId} />
        <div className="notes-page__header">
          <p className="notes-page__note-count">
            {notePriorityIds[activeTabId]} Notes ({Object.keys(filteredNotes).length})
          </p>
          <div className="notes-page__button-new">
            <button className="_button" type="button" onClick={() => setShowNewNoteForm(!showNewNoteForm)}>
              Add new
            </button>
          </div>
        </div>

        {!isEmpty(userNotes) && (
          <NotesList
            deleteNoteRequest={deleteNoteRequest}
            setEditNoteData={setEditNoteData}
            userNotes={activeTabId === 3 ? userNotes : filteredNotes}
          />
        )}
        {isEmpty(userNotes) && <p style={{ marginBottom: "10px" }}>There are no notes yet.</p>}

        {showNewNoteForm && (
          <CreateNote
            setShowNewNoteForm={setShowNewNoteForm}
            showNewNoteForm={showNewNoteForm}
            submitCreateNoteForm={submitCreateNoteForm}
          />
        )}
        {editNoteData && (
          <EditNote
            editNoteData={editNoteData}
            setEditNoteData={setEditNoteData}
            submitEditNoteForm={submitEditNoteForm}
          />
        )}
      </div>
    </div>
  );
};

export default Notes;
