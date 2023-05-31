import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from "react-router-dom";
import axios from 'axios'
import styles from"./transactions.css"
import companyLogo from './images/officialLogo.png';

const TransactionScreen = () => {

  const [transactionList, setTransactionList] = useState([])

  const fetchData = () => {
    axios.get("http://localhost:3001/transactions").then((response) => {
      const list = response.data[0].outputs.map((output) =>
                <ul key={output.id} className="plan-features">
                  <li key={output.address}> <h5> &nbsp; <u>Recipient</u> </h5> &nbsp; {output.address}</li>
                  <li key={output.amount}> <h4> &nbsp; <u>Amount</u> </h4> &nbsp; {output.amount} </li>
                  <li><h4> &nbsp; <u>Timestamp</u> </h4> &nbsp; {Date(response.data[0].input.timestamp)}</li>
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
         <img src={companyLogo} alt="Logo" className={styles.imageCont} width="200px" align="left"/> 
    <center>  <h3> Data Pirates CryptoCurrency </h3> </center>
    <center > <h1> Transaction History </h1> </center>
    <div className={styles.container}>{transactionList}</div>
    <center><Link to={"/wallet"} class="button">Go back to Home Page</Link></center>
      </div>
    )
  }
  export default TransactionScreen