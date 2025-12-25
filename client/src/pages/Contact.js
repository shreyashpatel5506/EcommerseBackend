import React, { useState } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!email || !message) {
      toast.error("Both fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommersebackendshreyash.onrender.com/api/contact/send-message",
        {
          email,
          message,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setEmail("");
        setMessage("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Contact Us - Ecommerce"} description={"Contact Us"}>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Side: Image */}
          <div className="col-md-6">
            <img
              src="/assests/Contact.jpg"
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Right Side: Contact Form */}
          <div className="col-md-6">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us!</p>

            {/* Email Input */}
            <input
              type="email"
              className="form-control my-2"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Message Text Box */}
            <textarea
              className="form-control my-3"
              rows="5"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            {/* Send Message Button */}
            <button
              className="btn btn-primary animated-btn"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Social Links */}
            <h5 className="mt-4">Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook fa-2x text-primary"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter fa-2x text-info"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram fa-2x text-danger"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin fa-2x text-primary"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
