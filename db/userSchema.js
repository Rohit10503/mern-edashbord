const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cPassword:String
})

module.exports=mongoose.model("users",userSchema);

//module.expoert=mongoose.export("users",userSchema); isme ka "users" ka naam collection walah hai.