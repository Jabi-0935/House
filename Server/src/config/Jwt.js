import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config({quiet:true})
const JWT_SECRET = process.env.JWT_SECRET;

export const generate_jwt=(payload)=>{
    return jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"});
}

export const verify_token = (token)=>{
    try{
        return jwt.verify(token,JWT_SECRET)
    }catch(err){
        throw new Error("Invalid or expired token")
    }
}

