import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config({quiet:true});
const MONGO_URI = process.env.MONGO_URI;


const ConnectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI);
    }catch(error){
        console.error("DB Connection Error");
    }
}

export default ConnectDB;

