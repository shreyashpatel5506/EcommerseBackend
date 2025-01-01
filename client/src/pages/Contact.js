import React from "react";
import Layout from "../component/layout/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Side: Image */}
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500x400"
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Right Side: Contact Form and Social Links */}
          <div className="col-md-6">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us!</p>

            {/* Message Text Box */}
            <textarea
              className="form-control my-3"
              rows="5"
              placeholder="Type your message here..."
            ></textarea>

            {/* Animated Send Message Button */}
            <button className="btn btn-primary animated-btn">
              Send Message
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
