import React from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="containerStyle">
        <h1>SignIn</h1>
      <input className="inputStyle" type="text" placeholder="Enter Email" />
      <input className="inputStyle" type="password" placeholder="Enter Password" />
      <button className="buttonStyle" onClick={goToHome}>Sign In</button>
    </div>
  );
}

export default Signin;
