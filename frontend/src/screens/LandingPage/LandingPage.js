import React, {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import './LandingPage.css'

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
          } else
            toast(`Hi ${data.user} 🦄`, {
              theme: "dark",
            });
        }
      };
      verifyUser();
    }, [cookies, navigate, removeCookie]);
    return (
    <div>
        <h1 className="centered2">DataCoin</h1>
        <div className="centered">
            <Link to={"/mine"} class="button">Mine</Link>
            <div class="divider"/>
            <div>
                <Link to={"/wallet"} class="button">Wallet</Link>
            </div>
        </div>
    </div>
  )
}

export default LandingPage