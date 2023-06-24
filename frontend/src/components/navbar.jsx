import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleAboutUs = () => {
    navigate("/aboutus");
  };

  const handleServices = () => {
    navigate("/service");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-buttons">
        <button className="btn btn-primary" onClick={handleSignin}>
          Sign In
        </button>
        <button className="btn btn-success" onClick={handleSignup}>
          Sign Up
        </button>
      </div>

      <div className="navbar-buttons">
        <button className="btn btn-outline-secondary" onClick={handleServices}>
          Team Members
        </button>
      </div>
    </div>
  );
}

export default Navbar;