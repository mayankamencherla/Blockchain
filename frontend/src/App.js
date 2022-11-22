import React, {useEffect, useState}from 'react'

function App() {
  
    const [publicKeyData, setPublicKeyData] = useState([{}])
    const [balanceData, setBalanceData] = useState([{}])


    useEffect(() => {
        fetch("/public-key").then(response => response.json())
        .then(data => {setPublicKeyData(data)})
    }, [])
    

    useEffect(() => {
        fetch("/balance").then(response => response.json())
        .then(data => {setBalanceData(data)})
    }, [])
    
    return (
    <div>
        <div>
        {(typeof balanceData.balance=== "undefined") ? (
            <p>Loading...</p>
        ):(
            balanceData.balance.map((availableCash) => (
                <p key={0}>Your available datacoin is {availableCash}</p>
            ))
        )}
        </div>
        <div>
        {(typeof publicKeyData.publicKey== "undefined") ? (
            <p>Loading...</p>
        ):(
            publicKeyData.publicKey.map((publicKey) => (
                <p key={0}>Your public key : {publicKey}</p>
            ))
        )}
        </div>
    </div>

    )
}

export default App