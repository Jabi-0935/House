import { verify_token } from "../config/Jwt.js";
export const authMiddleware =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error:"No Token Provided"})
    }
    
}