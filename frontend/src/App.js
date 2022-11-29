import React, {useEffect, useState}from 'react'


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
    <div>
        <div>
            <p> Your datacoin balance is: {balanceData}</p>
        </div>
        <div>
            <p> Your public key is: {publicKeyData}</p>
        </div>
    </div>

    )
}

export default App