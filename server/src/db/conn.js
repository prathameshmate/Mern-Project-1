import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.CONNECTION).then(()=>{
    console.log("nodejs - mongobd connection successfully");
}).catch((err)=>{
    console.log("nodejs - mongodb connection failed " +err)
})