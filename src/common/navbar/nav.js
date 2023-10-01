import React from "react";
import "./nav.css"
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }


  


    return (
        <>
            <div className="navbar">
                {auth ?
                   <ul className="nav-ul">
                        <li><Link to="/">Products </Link></li>
                        <li><Link to="/add-product">Add-Product</Link></li>
                        <li><Link to="/update-product">Update-Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/signup" onClick={logout}>Logout({JSON.parse(auth).name})</Link> </li>
                        
                    </ul>
                   
                    /**{<li>{ (!auth) ? <Link to="/signup">SignUp</Link> : 
                    <Link to="/signup" onClick={logout}>Logout</Link>
                    }</li>}*/

                    :

                    <ul className="nav-ul nav-right">
                        <><li><Link to="/signup">SignUp</Link> </li>
                            <li><Link to="/login" >Login</Link>
                            </li>
                        </>


                    </ul>
                }
            </div>

        </>
    );
}
export default Navbar