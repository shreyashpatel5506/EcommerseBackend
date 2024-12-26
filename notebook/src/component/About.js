import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About This Project</h1>
      
      <p>
        Welcome to the Notebook app! This application allows users to create, edit, and manage their personal notes in a simple and user-friendly interface. Whether you're keeping track of tasks, jotting down ideas, or managing your thoughts, this app provides all the features you need to organize and store your notes.
      </p>

      <h2>Features</h2>
      <ul>
        <li><strong>Add Notes:</strong> Easily add new notes with a title, description, and optional tags to keep them organized.</li>
        <li><strong>Edit Notes:</strong> You can update your existing notes to keep them relevant and up-to-date.</li>
        <li><strong>Delete Notes:</strong> If you no longer need a note, simply delete it.</li>
        <li><strong>User Authentication:</strong> Secure login to protect your notes with a unique user session stored in the browser.</li>
        <li><strong>Responsive Design:</strong> The app works seamlessly across desktops, tablets, and mobile devices.</li>
      </ul>

      <h2>How It Works</h2>
      <p>
        After logging in, you can view, add, or edit your notes. Each note consists of a title, a description, and a tag for easy categorization. The app ensures your notes are stored locally, so you don't lose any information.
      </p>
      <p>
        The notes are displayed in a list format, and you can click on any note to edit its content. Once you're done editing, the changes are saved automatically.
      </p>

      <h2>Contact</h2>
      <p>If you have any questions or feedback, feel free to reach out to us!</p>

      <p className="text-center">
        <a href="/home" className="btn btn-primary">Go Back to Home</a>
      </p>
    </div>
  );
};

export default About;