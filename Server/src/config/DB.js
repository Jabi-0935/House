import mongoose, { connect } from 'mongoose'

const ConnectDB = async(MONGO_URI)=>{
    try{
        await mongoose.connect(MONGO_URI)
    }catch(err){
        console.error("Some error from the database side",err);
        throw err
    }
}

export default ConnectDB;