import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light py-4"
      style={{
        background: "linear-gradient(45deg,rgb(0, 0, 0),rgb(110, 110, 110))",
      }}
    >
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4">
            <h5>About E-Shoap</h5>
            <p>
              E-Shoap is your digital companion for taking notes, organizing
              thoughts, and staying productive. Accessible anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>
              <i className="fa-solid fa-envelope me-2"></i>{" "}
              support@Eshreyash.com
            </p>
            <p>
              <i className="fa-solid fa-phone me-2"></i> +1 123-456-7890
            </p>
            <p>
              <i className="fa-solid fa-location-dot me-2"></i> 123 Shreyash
              Lane, Creativity City, 56789
            </p>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} E-Shoap. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
