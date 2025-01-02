import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{
          borderBottom: "1px solid #000",
          WebkitBoxShadow: "0px 5px 5px 0px rgba(0,0,0,0.75)",
          boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.75)",
          textTransform: "uppercase",
        }}
      >
        <div className="container-fluid">
          <i className="fa-solid fa-bag-shopping mx-3"></i>
          <Link className="navbar-brand" to="/">
            E-Commerse
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="d-flex ms-3">
              <Link className="btn btn-primary mx-1" role="button" to="/login">
                Login
              </Link>
              <Link
                className="btn btn-primary mx-1"
                role="button"
                to="/register"
              >
                Register
              </Link>
              <Link className="btn mx-1" role="button" to="/cart">
                <i class="fa-solid fa-cart-flatbed-suitcase"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
