import React, { useEffect, useState } from "react";
import "./products.css";
import { Link, useNavigate } from "react-router-dom";


const Product = () => {
    let i = 1;
    const [state, setState] = useState([]);


    const getProduct = async () => {
        let userid = await JSON.parse(localStorage.getItem("user"))._id;
        let fetch_products = await fetch(`http://localhost:5000/${userid}`);

        let actual_products = await fetch_products.json();
        if(actual_products.result==="None"){
            setState(false)
        }
        else{
        setState(actual_products);
        }

    }
    useEffect(() => {
        getProduct();
    }, []);


    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/${id}`, {
            method: "delete"
        }
        );
        if (result) {
            getProduct();
        }

    }

    return (
        <>
            <h1>Product Page</h1>
            <div className="main-content">
                <table border="1px solid black">
                    <tr className="table-head">
                        <th>Sr. no</th>
                        <th>Product name</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Update/Delete</th>
                    </tr>
                 
                    <tbody >
                        {
                            state ===false ? (<Link to="/add-product"><h5>CLick Here</h5></Link>):
                            
                           ( state.map((item) => {
                                return (

                                    <tr key={item._id} >
                                        <td>{i++}</td>
                                        <td>{item.name}</td>
                                        <td>{item.company}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td> <Link to={"/update-product/" + item._id}><i className="fa-solid fa-file-pen"></i>
                                        </Link> / <button className="del-btn" onClick={() => { deleteProduct(item._id) }}><i className="fa-solid fa-trash"></i></button> </td>
                                    </tr>


                                );
                            }))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Product;