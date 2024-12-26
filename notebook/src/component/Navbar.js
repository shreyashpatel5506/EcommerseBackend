import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileCard from './Profilecard';

const Navbar = (props) => {
    const [user, setUser] = useState(null); // State to store user data
    let location = useLocation();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/auth/getUser", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'jwtdata': localStorage.getItem('token'),
                    },
                });

                const json = await response.json();
                if (json.success) {
                    // Extract user data from the API response and set it in state
                    setUser({
                        username: json.user.username,
                        name: json.user.name,
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Optionally show an alert
                // props.showAlert("Something went wrong. Please try again later.", "danger");
            }
        };

        if (localStorage.getItem('token')) {
            fetchUserData();
        }
    }, []); // Only run on mount, no dependencies needed

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">i-NoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" || location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? (
                        <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-3" role="button" to="/login">Login</Link>
                            <Link className="btn btn-primary mx-3" role="button" to="/signup">Sign Up</Link>
                        </form>
                    ) : (
                        user && <ProfileCard username={user.username} name={user.name} />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;