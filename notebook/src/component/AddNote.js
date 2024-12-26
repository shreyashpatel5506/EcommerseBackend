import React, { useContext, useState } from 'react';
import notecontext from '../context/notes/NoteContext';

const AddNote = (props) => {
  const { showAlert, onNoteAdded } = props;  // onNoteAdded from parent to notify when the note is added
  const context = useContext(notecontext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // Handle the form submission and add the note
  const onClickAddNote = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!note.title || !note.description || !note.tag) {
      showAlert("Please fill all the fields", "danger");
      return;
    }
    
    // Show success alert
    showAlert("Note added successfully", "success");

    // Add the note using the context API's addNote function
    addNote(note.title, note.description, note.tag);

    // Clear the form fields after submission
    setNote({ title: "", description: "", tag: "" });

    // Notify the parent component that the note has been added (close modal)
    onNoteAdded();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal fade show d-block" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" aria-labelledby="addNoteModalLabel" aria-hidden="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNoteModalLabel">Add Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onNoteAdded}></button>
          </div>
          <div className="modal-body">
            <form className="my-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={note.title}
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  placeholder="Enter tag (default is 'general')"
                  value={note.tag}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={note.description}
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onNoteAdded}>Close</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickAddNote}
              disabled={note.title.length < 5 || note.description.length < 5}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;