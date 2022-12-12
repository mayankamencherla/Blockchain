import React, {useEffect, useState} from 'react'
import styles from"./walletStyle.css"
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios'
import { useCookies } from "react-cookie";


const WalletScreen = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const [balance, setBalance] = useState(0);
  const [publicKey, setPublicKey] = useState("");
  const [transactions, setTransactionList] = useState([]);

  const fetchData = () => {
    const balanceAPI = "http://localhost:3001/balance";
    const keyAPI = "http://localhost:3001/publicKey";
    const transactionAPI = "http://localhost:3001/transactions";

    const getBalance = axios.get(balanceAPI);
    const getKey = axios.get(keyAPI);
    const getTransactions = axios.get(transactionAPI);

    axios.all([getBalance, getKey, getTransactions]).then(
      axios.spread((...allData) => {
        const balance = allData[0].data
        const key = allData[1].data
        const t = allData[2].data
        
        setBalance(balance)
        setPublicKey(key)
        setTransactionList(t)
      })
    ) 
  }
  
  useEffect(() => {  
    fetchData();
  }, []);

    return (
      <div className={styles.Body}>
        <section class = "header">
          <img src="images/smallLogo.png" alt="Logo" class="image-cont image-shape" height="100" width="100" align="left"/>
          <button onClick={logout} align="right">Logout</button>
          <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
          <div class="container2">
            <center> <h1> Account Overview </h1> </center>
            <Link to={"/SendScreen"} class="button">Send Coins</Link> 
            <Link to={"/RecieveScreen"} class="button">Recieve Coins</Link>
            <Link to={"/TransactionScreen"} class="button">View Transactions</Link>
            <Link to={"/PurchaseScreen"} class="button">Purchase Data Coin</Link>
         </div>
    </section>
   
    <section class = "main_Wallet">
        <div class="mainPage">
          <center> <h2> <u>  Account Balance  </u> </h2> </center>
          <center> <h2> {balance} </h2> </center>
            <div class="row">
              <div class="column">
                <center> <h2> <u> Unconfirmed Balance </u> </h2> </center>
                <center><h2>0</h2></center>
              </div>
              <div class="column">
                <center><h2><u>Number of Transactions</u></h2></center>
                <center><h2>{transactions.length}</h2></center>
              </div>
            </div>
            <button onClick={() => window.location.reload(false)}>Refresh</button>
            <button onClick={() => { navigator.clipboard.writeText(publicKey)}}>copyKey</button>
          </div>
    </section>
    
      </div>
    )
  }
  export default WalletScreen