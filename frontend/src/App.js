import {Route, BrowserRouter, Router, Routes} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import WalletScreen from "./screens/WalletScreen/WalletScreen";
import RecieveScreen from "./screens/RecieveScreen/RecieveScreen";
import TransactionScreen from "./screens/TransactionScreen/TransactionScreen";
import PurchaseScreen from "./screens/PurchaseScreen/PurchaseScreen";
import SendScreen from "./screens/SendScreen/SendScreen";


function App() {

    return (
        <BrowserRouter>
                <Routes>
                     <Route path='/' element={<WalletScreen />} />
                     <Route path="/SendScreen" element={<SendScreen />} />
                     <Route path="/RecieveScreen" element={<RecieveScreen />} />
                     <Route path="/TransactionScreen" element={<TransactionScreen />} />
                     <Route path="/PurchaseScreen" element={<PurchaseScreen />} />
                </Routes>

        </BrowserRouter>      
       
        
       
        
      
    )}

export default App