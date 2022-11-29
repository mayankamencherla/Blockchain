import React, {useEffect, useState}from 'react'
import styles from './App.css';

function App() {

    const [publicKeyData, setPublicKeyData] = useState("")
    const [balanceData, setBalanceData] = useState("")


    useEffect(() => {
        fetch("http://localhost:3001/publicKey").then(response => response.json())
        .then(data => {setPublicKeyData(data)})
    }, [])


    useEffect(() => {
        fetch("http://localhost:3001/balance").then(response => response.json())
        .then(data => {setBalanceData(data)})
    }, [])

    return (
    <div className={styles.Body}>
    <img src="images/smallLogo.png" alt="Logo" class="image-cont image-shape" height="100" width="100" align="left"/>
    <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
        <div class="container">
          <center> <h1> Account Overview </h1> </center>
          <a href="recievedCoinsPage.html" class="button">Send Coins</a>
          <a href="recievedCoinsPage.html" class="button">Recieve Coins</a>
          <a href="transactionsPage.html" class="button">View Transactions</a>
          <a href="buyCoinsPage.html" class="button">Purchase DataCoins</a>
        </div>
    <section class = "main_Wallet">
        <div class="mainPage">
          <center> <h2> <u>  Account Balance  </u> </h2> </center>
          <div>
          <center> <h2> {(typeof balanceData.balance=== "undefined") ? (
              <p>Loading...</p>
          ):(
              balanceData.balance.map((availableCash) => (
                  <p key={0}>Your available datacoin is {availableCash}</p>
              ))
          )} </h2> </center>
          </div>
          <div class="row">
              <div class="column">
                <center> <h2> <u> Unconfirmed Balance </u> </h2> </center>
                <center><h2>$186</h2></center>
          </div>
          <div class="column">
                <center><h2><u>Number of Transactions</u></h2></center>
                <center><h2>10</h2></center>
          </div>
            <a href="walletUI.html" class="secbutton">Refresh</a>
            <a href="walletUI.html" class="secbutton">Copy Key</a>
          </div>
        </div>
    </section>
        <div>
            <p> Your public key is: {publicKeyData}</p>
        </div>
    </div>
    )
}

export default App
