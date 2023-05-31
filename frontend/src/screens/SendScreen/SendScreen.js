import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import styles from"./sendScreen.css"
import { Link } from "react-router-dom";
import companyLogo from './images/officialLogo.png';



const SendScreen = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0)

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/transact",
        {
          recipient, amount
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { recipient, amount } = data.errors;
          if (recipient) generateError(recipient);
          else if (amount) generateError(amount);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

    return (    
      <div className={styles.Body}>
        <img src={companyLogo} alt="Logo" className={styles.imageCont} width="200px" align="center"/> 
        <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
        <center> <h1> Send DataCoins</h1> </center>
        <form onSubmit={(e) => handleSubmit(e)}>

        <div class="container">
            <label>Recipient Adress : </label>
            <input 
              type="text"
              placeholder="Enter Recipients's Adress"
              value = {recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required/>

            <label>Amount : </label>
            <input 
              type="num"
              placeholder="000.00"
              name = {amount}
              onChange={(e) => setAmount(e.target.value)}
              required/>
            
            <button className="button" type = "submit" >Send</button>
        </div>
    </form>
      </div>
    );
  };
  export default SendScreen;