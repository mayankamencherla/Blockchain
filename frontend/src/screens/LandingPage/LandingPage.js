import React, {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import './LandingPage.css'
import companyLogo from './officialLogo.png';


const LandingPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
      const verifyUser = async () => {
        if (!cookies.jwt) {
          navigate("/login");
        } else {
          const { data } = await axios.post(
            "http://localhost:3001",
            {},
            {
              withCredentials: true,
            }
          );
          if (!data.status) {
            removeCookie("jwt");
            navigate("/login");
          }
        }
      };
      verifyUser();
    }, [cookies, navigate, removeCookie]);
    return (
    <div>
               <img src={companyLogo} alt="Logo" width="200px" align="left"/> 
        <h1 className="centered2">DataCoin</h1>
            <div>
                <Link to={"/wallet"} class="button2">Wallet</Link>
        </div>
                            <div>
            <Link to={"/mine"} class="button1">Mine</Link>
                    </div>
    </div>
  )
}

export default LandingPage