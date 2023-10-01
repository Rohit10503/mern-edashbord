import React, { useEffect, useState } from "react";
import "./signup.css"
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    
    /**REDIRECT IF USER LOOGED IN***************************************** */
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }

    },[])
    /***Redirection ends here********************************************** */



    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: ""
    });

    const collectData = async (e) => {
        e.preventDefault();
        const { name, email, password, cPassword } = user;
        if (password !== cPassword) {
            alert("Passwords Not matchs")

        }
        else {
            console.log(user);
            let result = await fetch("http://localhost:5000/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password, cPassword }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            //  result=await result.json();
            //  console.log(result);


            /**For empty of input field and redirectio to home page */
            if (result) {
                result = await result.json();
                localStorage.setItem("user", JSON.stringify(result))
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    cPassword: ""
                });

                alert("stored");
                navigate('/');

            }
        }

    }



    return (

        <>
            <h1>Register Here</h1>
            <form className="form-tag" >
                <input type="text" placeholder="Enter Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <input type="text" placeholder="Enter your Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type="password" placeholder="Enter Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input type="password" placeholder="Confirm Password" value={user.cPassword} onChange={(e) => setUser({ ...user, cPassword: e.target.value })} />
                <input className="button" type="button" value={"Login"} onClick={collectData} />
            </form>

        </>
    );

};
export default SignUp;