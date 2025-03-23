import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import OtpInput from "react-otp-input";

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
    answer: "",
  });

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { email, password, phone, address, name, termsAccepted, answer } =
    formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required!");
      return;
    }

    try {
      const response = await fetch(
        "https://ecommersebackend-pwe8.onrender.com/api/auth/register/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const json = await response.json();

      if (response.ok && json.success) {
        toast.success("OTP sent successfully");
        setShowOtpInput(true);
      } else {
        toast.error(json.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name || !phone || !address || !answer) {
      toast.error("All fields are required!");
      return;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    if (!otp) {
      toast.error("OTP is required!");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://ecommersebackend-pwe8.onrender.com/api/auth/register/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, otp }),
        }
      );

      const json = await response.json();

      if (response.ok && json.success) {
        toast.success("Account created successfully");
        setAuth({
          ...auth,
          user: json.user,
          token: json.token,
        });

        localStorage.setItem("auth", JSON.stringify(json));
        navigate(`/dashboard/${json.user.role === "Admin" ? "admin" : "user"}`);
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
                  pattern="^[0-9]{10}$"
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
              <div className="form-group">
                <label htmlFor="answer">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  name="answer"
                  placeholder="Enter your answer"
                  value={answer}
                  onChange={handleChange}
                  required
                />
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

              {showOtpInput && (
                <div className="form-group">
                  <label htmlFor="otp">OTP</label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span>-</span>}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 0.5rem",
                      fontSize: "2rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    renderInput={(props) => <input {...props} />} // Fixes the error
                  />
                </div>
              )}

              {!showOtpInput ? (
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
