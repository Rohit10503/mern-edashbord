import React from "react";
import "./footer.css"
import { Link } from "react-router-dom";
const Footer=()=>{
    return(
        <>
        <div className="foot">
            <span>E-Dashbord</span>
            <p className="footer-p">Delveloped and maintained by <span classname="footer-link"><Link  to="https://rohit10503.github.io/sem4">Rohitkumar</Link></span> </p>
        </div>
        
        </>
    );
}
export default Footer;