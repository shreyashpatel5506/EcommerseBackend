import React, { useState,  useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const jwtToken =localStorage.getItem('token');
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    name: localStorage.getItem("name"),
  });
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);
  useEffect(() => {
    setUser({
      username: localStorage.getItem("username"),
      name: localStorage.getItem("name"),
    });
  }, []);

  // Function to update user info (e.g., after login)
  const updateUser = (username, name) => {
    localStorage.setItem("username", username);
    localStorage.setItem("name", name);
    setUser({ username, name });
  };
  // Fetch all notes
  const getnote = async () => {
    try {
      const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: "GET",
        headers: {
          jwtdata: jwtToken,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch notes:", response.status);
        return;
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwtdata: jwtToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Failed to add note:", response.status);
        return;
      }

      const newNote = await response.json();
      setNotes([newNote,...notes,]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
const DeleteNote = async (id) => {
  try {
    // Optimistically update the state before calling the API
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes); // Update state immediately

    // Make the API call to delete the note
    const response = await fetch(`${host}/api/note/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        jwtdata: jwtToken,
      },
    });

    if (!response.ok) {
      console.error("Failed to delete note:", response.status);
      // If the deletion failed, you can revert the state update
      setNotes(notes);
      return;
    }

    // Check if the response is in JSON format
    const contentType = response.headers.get("content-type");

    let jsonResponse = {};
    if (contentType && contentType.includes("application/json")) {
      // If response is JSON, parse it
      jsonResponse = await response.json();
      console.log("Delete response:", jsonResponse);
    } else {
      // If it's not JSON, log the response text
      const textResponse = await response.text();
      console.log("Delete response (text):", textResponse);
    }

  } catch (error) {
    console.error("Error deleting note:", error);
    // In case of error, restore the previous state
    setNotes(notes);
  }
};

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwtdata: jwtToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      if (!response.ok) {
        console.error("Failed to edit note:", response.status);
        return;
      }
  
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
  
      // Update the state with the new notes array
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
    

    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, DeleteNote, editNote, getnote,user,updateUser }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;