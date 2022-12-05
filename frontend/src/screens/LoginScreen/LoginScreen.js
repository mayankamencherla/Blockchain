import React from 'react'
import { Link } from "react-router-dom";
import "./LoginScreen.css"

const LoginScreen = () => {
  return (
    <div>
    <h1 style={{"textAlign" :"center"}}> Data Coin</h1>
    <form>
        <div className="container">
            <label>Username : </label>
            <input type="text" placeholder="Enter Username" name="username" required/>
            <label>Password : </label>
            <input type="password" placeholder="Enter Password" name="password" required/>
            <button style = {{color: "#04989E", padding: 5, margin: 10}}>Login</button>
            <div>
            <span>
              Don't have an account?
              <Link to={"/register"}>Register</Link>
            </span>
            </div>
            
        </div>
    </form>
</div>
  )
}

export default LoginScreen