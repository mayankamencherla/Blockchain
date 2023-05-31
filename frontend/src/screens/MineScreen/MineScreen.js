import React, { useEffect, useState } from 'react'
import { ToastContainer, toast} from 'react-toastify';
import axios from 'axios'
import styles from "./MineScreen.css"
const MineScreen = () => {
    const [blocks, setBlocks] = useState([])

  const fetchData = () => {
    axios.get("http://localhost:3001/blocks").then((response) => {
      const list = response.data.map((block, index) =>
            <div class="plan-card plan-one">
            <div class="pricing-header">
                <div key={index}class="plan-save">Block: {index}</div>
            </div>
            <ul class="plan-features">
                <li>Timestamp: {block.timestamp}</li>
                <li>Hash: {block.hash}</li>
                <li>Last Hash: {block.lastHash}</li>
                <li>Difficulty: {block.difficulty}</li>
                <li>nonce: {block.nonce}</li>
            </ul>
            </div>)  
      setBlocks(list)
      console.log(response.data);
    }); 
  };

  const mineBlock = async () => {
    console.log("function is called")
    await axios.get("http://localhost:3001/mine").then((response) => {
        showToastMessage(1)
    })
    .catch((error) => {showToastMessage(false)})
    setTimeout(function(){ 
        window.location.reload(false)
    }, 2000); 
  };

  const showToastMessage = (res) => {
        if (res === 0) {
            toast.error('There is no mine to block!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (res === 1) {
            toast.success('Blocked mined successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (res === 2) {
            toast.error('Error mining block', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
  
  useEffect(() => {  
    fetchData();
  }, []);

  return (
    <div className={styles.Body}>
        <div><h1>Mine Blocks</h1></div>
        <div><button onClick = {mineBlock}>Mine</button></div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                {blocks}
            </div>
        <ToastContainer/>
    </div>
  )
}

export default MineScreen