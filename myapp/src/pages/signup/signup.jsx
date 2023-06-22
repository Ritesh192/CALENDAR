import React from "react";
import "./signup.css";
import {useNavigate} from "react-router-dom";

function SignUp(){
    const navigate =useNavigate();
    const goSignIn = () => {
        navigate('/signin');
    }
    return(
        <div className="containerStyle">
            <h1>SignUp</h1>
            <input className="inputStyle" type="text" placeholder="Enter Name: "/>
            <input className ="inputStyle" type="email" placeholder="Enter Email: "/>
            <input className ="inputStyle" type="password" placeholder="Enter Password:" />
            <input className ="inputStyle" type="password" placeholder="Confirm Password: "/>
            <button className="buttonStyle" onClick={goSignIn}>SignUp</button> 
            
            
        </div>
    );
    
}

export default SignUp;