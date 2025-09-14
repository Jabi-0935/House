import mongoose from "mongoose";

const connectDB = async (uri)=>{
    try{
        await mongoose.connect(uri);
    }catch(err){
        console.error("Connection failed with DB",err)
    }
}


export default connectDB;