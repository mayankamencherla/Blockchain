import {Route, BrowserRouter, Routes} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import WalletScreen from "./screens/WalletScreen/WalletScreen";
import LandingPage from "./screens/LandingPage/LandingPage";
import MineScreen from "./screens/MineScreen/MineScreen";
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
      </Routes>
    </BrowserRouter>
    )}

export default App