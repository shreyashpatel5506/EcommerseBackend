import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';



const Signup = (props) => {
  const {updateUser}=useContext(noteContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword, username } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.jwtToken);
        localStorage.setItem('username', json.username); // Save username
        localStorage.setItem('name', json.name);         // Save name
        updateUser(json.username, json.name);
        window.location.replace("/home");
        props.showAlert("Account created successfully", "success");
      } else {
      props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
    props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container"
      style={{
        width: "50%",
        margin: "auto",
        border: "2px solid black",
        padding: "20px",
        marginTop: "50px",
        borderRadius: "10px",
      }}
    >
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={credentials.name}
            id="name"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            value={credentials.email}
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={credentials.username}
            id="username"
            name="username"
            placeholder="Choose a username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.password}
            id="password"
            name="password"
            placeholder="Enter your password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={credentials.cpassword}
            id="cpassword"
            name="cpassword"
            placeholder="Re-enter your password"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;