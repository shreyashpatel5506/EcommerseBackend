import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote'; // Assuming this is a component for adding notes
import { useNavigate } from 'react-router-dom';

const Notes = ({ showAlert }) => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { notes, getnote, editNote, addNote } = context;

  useEffect(() => {
    console.log(localStorage.getItem("token")); // Debugging line
    if (localStorage.getItem("token")) {
      getnote();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  // Initialize with default values to prevent undefined issues
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });

  // Manage whether to show the AddNote component or the EditNote modal
  const [showAddNote, setShowAddNote] = useState(false);

  // Handle note update when edit button is clicked
  const updateNote = (currentNote) => {
    console.log("Current Note:", currentNote, currentNote._id); // Debugging line
    setShowAddNote(false); // Close AddNote component if edit is being triggered
    ref.current.click(); // Open the modal for editing note
    setNote({
      id: currentNote._id,  // Set a default value if _id is undefined
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      etag: currentNote.tag || ""
    });
  };

  // Handle submit when user clicks on Update button in the modal
  const handleClick = () => {
    console.log("Updating Note:", note); // Debugging line
    showAlert("Note updated successfully", "success");
    if (note.etitle && note.edescription) {
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click(); // Close the modal
    }
  };

  // Handle changes in the input fields for updating the note
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Function to handle successful note addition
  const handleNoteAdded = () => {
    setShowAddNote(false); // Hide the AddNote component
    showAlert("Note added successfully", "success"); // Show success message
  };

  return (
    <>
      {/* Conditionally render the plus icon based on showAddNote state */}
      {!showAddNote && (
        <i
          className="fa-solid fa-plus"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            fontSize: '50px',
            backgroundColor: '#107a5a',
            color: 'white',
            borderRadius: '50%',
            padding: '20px',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}
          onClick={() => setShowAddNote(true)} // Show AddNote component
        ></i>
      )}

      {/* Render AddNote component when the state is true */}
      {showAddNote && <AddNote showAlert={showAlert} onNoteAdded={handleNoteAdded} />}

      {/* Button to trigger modal for editing note */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal for editing notes */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Displaying Notes */}
      <div className="row my-3">
        <h2>Your Notes</h2>

        {notes.length === 0 ? (
          <p>No notes to display</p>
        ) : (
          notes.map((note) => (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;