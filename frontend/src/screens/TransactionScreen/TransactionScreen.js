import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios'
import styles from"./transactions.css"

const TransactionScreen = () => {

  const [transactionList, setTransactionList] = useState([])

  const fetchData = () => {
    axios.get("http://localhost:3001/transactions").then((response) => {
      const list = response.data[0].outputs.map((output) =>
                <ul key={output.id} className="plan-features">
                  <li key={output.address}> Recipient: {output.address} </li>
                  <li key={output.amount}> Amount {output.amount} </li>
                  <li>Timestamp: {response.data[0].input.timestamp}</li>
                </ul>)  
      setTransactionList(list)
      console.log(response.data);
    }); 
  }
  
  useEffect(() => {  
    fetchData();
  }, []);

    return (
      <div className={styles.Body}>
        <img src="images/smallLogo.png" alt="Logo" className="image-cont image-shape" height="100" width="100" align="left"/>
    <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
    <center> <h1> Transaction History </h1> </center>
    <div>{transactionList}</div>
    <center><Link to={"/wallet"} class="button">Go back to Home Page</Link></center>
      </div>
    )
  }
  export default TransactionScreen