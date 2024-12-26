import React, { useContext } from 'react'
import notecontext from '../context/notes/NoteContext'
const NoteItem = (props) => {
  const context = useContext(notecontext)
  const { DeleteNote } = context;
  const { note, updateNote } = props;

  return (

    <div className="col-md-3 my-3" style={{ border: '2px solid #20492c',borderRadius:'15px', margin: '5px', padding: '7px 12px',backgroundColor:'#65ff94', color: "#074d4c"}}>

      <div className="card-body">
        <h5 className="card-title my-3">{note.title}</h5>
        <h6 className="card-tag my-3">{note.tag}</h6>
        <p className="card-text my-3">
          {note.description}
        </p>
        <div style={{ padding: '15px' }}>
          <i className="fa-solid fa-trash" style={{ color: '#107a5a', cursor: 'pointer', padding: '15px' }} onClick={() => { DeleteNote(note._id) }}></i>
          <i className="fa-solid fa-pen-to-square" style={{ color: '#107a5a', cursor: 'pointer', padding: '15px' }} onClick={() => { updateNote(note) }}></i>
        </div>
      </div>

    </div>

  )
}

export default NoteItem