import React from 'react'
import styles from"./transactions.css"

const TransactionScreen = () => {
    return (
      <div className={styles.Body}>
        <img src="images/smallLogo.png" alt="Logo" class="image-cont image-shape" height="100" width="100" align="left"/>
    <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
    <center> <h1> Transaction History </h1> </center>
    <form>
        <div class="container">
            <label>Senders Adress : </label>
            <input type="text" placeholder="Sender's Adress" name="sender" readonly/>
            <label>Recipient Adress : </label>
            <input type="text" placeholder="Recipients's Adress" name="recipient" readonly/>
            <label>Amount : </label>
            <input type="text" placeholder="000.00" name="amount" readonly/>
            <label>Date : </label>
            <input type="text" placeholder="DD/MM/YYYY" name="date" readonly/>
        </div>
    </form>
    <form>
        <div class="container">
            <label>Senders Adress : </label>
            <input type="text" placeholder="Sender's Adress" name="sender" readonly/>
            <label>Recipient Adress : </label>
            <input type="text" placeholder="Recipients's Adress" name="recipient" readonly/>
            <label>Amount : </label>
            <input type="text" placeholder="000.00" name="amount" readonly/>
            <label>Date : </label>
            <input type="text" placeholder="DD/MM/YYYY" name="date" readonly/>
        </div>
    </form>
    <center><a href = "walletUI.html" class = "button">Return to HomePage</a></center>
      </div>
    )
  }
  export default TransactionScreen