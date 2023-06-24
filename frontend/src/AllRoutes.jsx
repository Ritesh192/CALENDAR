import React from "react";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import DemoApp from './components/homepage';
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import Services from "./components/services/services";
import Navbar from "./components/navbar";
import '../node_modules/smart-webcomponents-react/source/styles/smart.default.css';
//import './App.css';

function AllRoutes() {
  return (
    <div className="App">
        <Navbar/>
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/service" element={<Services />} />
            <Route path="/homepage" element={<DemoApp />} />
             
        </Routes>
    </div>
  );
}

export default AllRoutes;