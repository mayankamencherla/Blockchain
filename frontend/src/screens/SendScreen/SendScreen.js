import React from 'react'
import styles from"./sendScreen.css"

const SendScreen = () => {
    return (
      <div className={styles.Body}>
        <img src="images/smallLogo.png" alt="Logo" class="image-cont image-shape" height="100" width="100" align="left"/>
        <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
        <center> <h1> Send Data Coins</h1> </center>
        <form action="index.js/transact" id ="sendCoinsForm" method="post">
        <div class="container">
            <label>Senders Adress : </label>
            <input type="text" placeholder="Enter Sender's Adress" name="sender" required/>
            <label>Recipient Adress : </label>
            <input type="text" placeholder="Enter Recipients's Adress" name="recipient" required/>
            <label>Amount : </label>
            <input type="text" placeholder="000.00" name="amount" required/>
            <center><a href = "sendCoinsPage.html" class = "button">Send</a></center>
        </div>
    </form>
      </div>
    );
  };
  export default SendScreen;