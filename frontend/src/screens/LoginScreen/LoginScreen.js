import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./LoginScreen.css"


const LoginScreen = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("") 
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/login",
        {
          username, passphrase
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { username, passphrase } = data.errors;
          if (username) generateError(username);
          else if (passphrase) generateError(passphrase);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
    <h1 style={{"textAlign" :"center"}}>Login</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container">
            <label htmlFor="username">Username : </label>
            <input 
              type="text" 
              placeholder="Enter Username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            required/>

            <label htmlFor="password">Password : </label>
            <input 
              type="password"
              placeholder="Enter Passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            required/>
            <button style = {{color: "#04989E", padding: 5, margin: 10}} type = "submit" >Login</button>
            <Link to="/register">Register</Link>
        </div>
    </form>
    <ToastContainer/>
</div>
  )
}

export default LoginScreen