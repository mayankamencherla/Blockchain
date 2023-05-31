import React from 'react'
import styles from"./purchase.css"

const PurchaseScreen = () => {
    return (
      <div className={styles.Body}>
        <img src="images/smallLogo.png" alt="Logo" class="image-cont image-shape" height="100" width="100" align="left"/>
        <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
        <center> <h1> Purchase Data Coins CryptoCurrency</h1> </center>
        <form>
            <div class="container">
                <label>Card Number </label>
                <input type="text" placeholder="Enter Debit/Credit Card Number" name="account" required/>
                <label>Expiration Date : </label>
                <input type="text" placeholder="MM/YY" name="date" required/>
                <label>Security Code : </label>
                <input type="text" placeholder="###" name="code" required/>
                <label>Amount to Purchase : </label>
                <input type="text" placeholder="###" name="code" required/>
                <center><a href = "walletUI.html" class = "button">Confirm Purchase</a></center>
            </div>
        </form>
            
      </div>
    )
  }
  export default PurchaseScreen