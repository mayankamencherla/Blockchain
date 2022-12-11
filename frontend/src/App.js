import {Route, BrowserRouter, Routes} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import WalletScreen from "./screens/WalletScreen/WalletScreen";
import LandingPage from "./screens/LandingPage/LandingPage";
import MineScreen from "./screens/MineScreen/MineScreen";
import SendScreen from "./screens/SendScreen/SendScreen";
import TransactionScreen from "./screens/TransactionScreen/TransactionScreen";
import "react-toastify/dist/ReactToastify.css";


function App() {

    return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/wallet" element={<WalletScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/mine" element={<MineScreen />} />
        <Route exact path="/SendScreen" element={<SendScreen />} />
        <Route exact path="/TransactionScreen" element={<TransactionScreen />} />
      </Routes>
    </BrowserRouter>
    )}

export default App