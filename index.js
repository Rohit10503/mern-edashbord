const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/userSchema");         //Model hai User 
const Product=require("./db/productSchema")

app.use(express.json());

//as frontend and backend are oprates on diffrent ports so, we use cors
const cors = require("cors");
const productSchema = require("./db/productSchema");
app.use(cors());

app.post("/signup", async (req, res) => {
    let user = new User(req.body);      //capital User walla  model hai
    let result = await user.save();
    result=result.toObject();
    delete result.password , result.cPassword;  
    res.send(result);
 

})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {

        let user = await User.findOne(req.body).select("-password -cPassword");
        if (user) {
            res.send(user);
        }
        else {
            res.send({"result": "user Not found"});
        }
    }
    else{
        res.send({"result":"necessery credentials missing"})    //json
    }
})


app.post("/add-product",async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    if(result){
        res.send(result);
    }

})

//For fetching and displaying
app.get("/:id",async(req,res)=>{
    let currentuserid=req.params.id;
    let products=await Product.find({userId:currentuserid});
    if(products.length>0){
        res.send(products) ;
    }else{
        res.send({result: "None"})
    }

});


//for Deleting data product
app.delete("/:id",async(req,res)=>{
    let prd_id=req.params.id;
    let result=await Product.deleteOne({_id:prd_id});
    res.send(result);

})

//for updatingcgetting single product info to show on update-page
app.get("/update-product/:id",async(req,res)=>{
    let prd_id= req.params.id;
    let result=await Product.findOne({_id:prd_id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"not found"});
    }
});

app.put("/update-product/:id",async(req,res)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result)
})


app.listen(5000);