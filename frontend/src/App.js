import {Route, BrowserRouter, Routes} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import WalletScreen from "./screens/WalletScreen/WalletScreen";
import "react-toastify/dist/ReactToastify.css";


function App() {

    return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WalletScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
    )}

export default App