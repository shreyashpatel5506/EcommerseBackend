import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const Register = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User", // Default role
    phone: "",
    address: "",
    name: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { email, password, role, phone, address, name, termsAccepted } =
    formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !name || !phone || !address) {
      toast.error("All fields are required!");
      return;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5020/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok && json.success !== undefined) {
        toast.success("Account created successfully");
        setAuth({
          ...auth,
          user: json.user,
          token: json.token, // Updated key
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate("/login");
      } else {
        toast.error(json.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while registering. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Layout>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">Register</h5>
            <form className="my-5 form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={handleChange}
                  required
                  pattern="^[0-9]{10}$" // Matches a 10-digit phone number
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Role</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="role"
                  value={role}
                  onChange={handleChange}
                >
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Address</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                  required
                ></textarea>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  name="termsAccepted"
                  checked={termsAccepted}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I accept the terms and conditions
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
