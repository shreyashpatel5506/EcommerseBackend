import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const {updateUser}=useContext(noteContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/loginUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Save token and user info to localStorage
                localStorage.setItem('token', json.jwtToken);
                localStorage.setItem('username', json.username); // Save username
                localStorage.setItem('name', json.name);         // Save name
                updateUser(json.username,json.name);
                // Show success alert
                props.showAlert("Logged in Successfully", "success");
                window.location.replace("/home");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            props.showAlert("Something went wrong. Please try again later.", "danger");
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ width: '50%', margin: 'auto', border: '2px solid black', padding: '20px', marginTop: '50px', borderRadius: '10px' }}>
            <h2>Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onchange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onchange}
                        name="password"
                        id="password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;