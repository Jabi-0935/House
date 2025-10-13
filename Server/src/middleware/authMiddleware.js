import { verify_token } from "../config/Jwt.js";
export const authMiddleware =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error:"No Token Provided"})
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = verify_token(token);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({error:"Invalid or Expired token"})
    }
}