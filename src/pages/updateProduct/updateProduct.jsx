import React, { useEffect, useState } from "react";
import "./updateProduct.css"
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {

    
    const [product, setProduct] = useState({
        name: "",
        company: "",
        price: "",
        category: "",
        userId: ""

    });
    const navigate = useNavigate();

    /********************Prefilling Start******************************************* */
    const params = useParams();  //getting parameter in url box
    let cur_userid = JSON.parse(localStorage.getItem("user"))._id;
    //console.log(`userid is ${cur_userid}`)


    const getDeatails = async () => {
        let result = await fetch(`http://localhost:5000/update-product/${params.id}`);
        result = await result.json();
       
        
            setProduct({
                name: result.name,
                company: result.company,
                price: result.price,
                category: result.category,
                userId: cur_userid
            });
        
    }


    useEffect(() => {
        getDeatails();
    }, []);

    /*********Prefilling stop*************** */


    const dataHandle = async () => {
        const { name, company, price, category } = product;
        let result = await fetch(`http://localhost:5000/update-product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, company, price, category }),
            headers: {

                'Content-Type': 'application/json'
            }
        });

        if (result) {
            navigate("/");
        }

    }




    
        return (
            <>
                <h1>Update Product</h1>
                <form className="form">
                    <input type="text" placeholder="Enter product name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />

                    <input type="text" placeholder="Enter company" value={product.company} onChange={(e) => { setProduct({ ...product, company: e.target.value }) }} />

                    <input type="text" placeholder="Enter Price" value={product.price} onChange={(e) => { setProduct({ ...product, price: e.target.value }) }} />

                    <input type="text" placeholder="Enter Category" value={product.category} onChange={(e) => { setProduct({ ...product, category: e.target.value }) }} />

                    <input type="button" className="button" value="Update Product" onClick={dataHandle} />

                </form>

            </>
        );
    

}

export default UpdateProduct;