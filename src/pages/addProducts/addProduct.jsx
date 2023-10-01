import React, { useState } from "react";
import "./addproduct.css"
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        company: "",
        price: "",
        category: "",
        userId: ""

    });
    const [err,seterr]=useState(false);
    const navigate=useNavigate();



    const dataHandle = async () => {
        if (!product.name || !product.company || !product.price || !product.category) {
            seterr(true);
            return false;

        }
        else {
            product.userId = JSON.parse(localStorage.getItem("user"))._id;
            console.log(product);
            const { name, company, price, category, userId } = product;

            let result = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: JSON.stringify({ name, company, price, category, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json();
            console.log(result);
            setProduct({
                name: "",
                company: "",
                price: "",
                category: "",
                userId: ""
            });
            navigate("/")
        }
    }




    return (
        <>
            <form className="form">
                <input type="text" placeholder="Enter product name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                {err && !product.name && <div className="err-text" >Enter valid name</div>}
                <input type="text" placeholder="Enter company" value={product.company} onChange={(e) => { setProduct({ ...product, company: e.target.value }) }} />
                {err && !product.company && <div className="err-text" >Enter valid company</div>}
                <input type="text" placeholder="Enter Price" value={product.price} onChange={(e) => { setProduct({ ...product, price: e.target.value }) }} />
                {err && !product.price && <div className="err-text" >Enter valid price</div>}
                <input type="text" placeholder="Enter Category" value={product.category} onChange={(e) => { setProduct({ ...product, category: e.target.value }) }} />
                {err && !product.category && <div className="err-text" >Enter valid category</div>}
                <input type="button" className="button" value="Add Product" onClick={dataHandle} />

            </form>

        </>
    );

}
export default AddProduct;