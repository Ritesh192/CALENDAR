import React, { useContext } from "react";
import SearchContext from "../searchContext";
import { useNavigate } from "react-router-dom";
import './navbar.css';

function Navbar(){
    const {search,updateSearch}=useContext(SearchContext);
    const navigate = useNavigate();
    const  handleChange=(e) =>{
        updateSearch(e.target.value);
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleSignin = () => {
        navigate('/signin');
    };

    return  (
        <div>
            <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e)=>handleChange(e)}
            />
            <button onClick={handleSignin}>Sign In</button>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}
export default Navbar;