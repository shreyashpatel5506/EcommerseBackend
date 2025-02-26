import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5020/api/auth/forgot-password/send-otp",
        {
          email,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        setShowOtpInput(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5020/api/auth/forgot-password/verify-otp",
        {
          email,
          newPassword,
          answer,
          otp,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          {showOtpInput && (
            <div className="mb-3">
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
              />
            </div>
          )}

          {!showOtpInput ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
