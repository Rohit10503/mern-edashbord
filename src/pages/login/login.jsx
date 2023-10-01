import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import("./login.css");
const Login = () => {

    const navigate=useNavigate();
    const auth =localStorage.getItem("user");
    /*******REDIRECT IF USER LOGGED IN TO HOME ************** */
    useEffect(()=>{
        if (auth){
            navigate("/")
        }
    },[])



    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const collectData = async () => {
        const { email, password } = user;
        //console.log(user);
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result=await result.json();
        //console.log(result)
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/")
            alert((result.name)+" Welcome")
        }else{
            alert("Invalid Credentials!");
        }


    }
    return (
        <>
            <form className="form-tag">
                <input type="text" placeholder="Enter Email ..." value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type="text" placeholder="Enter Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input className="button" type="button" value="Continue" onClick={collectData} />
            </form>
        </>
    );
}
export default Login;