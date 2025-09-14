import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';


dotenv.config({quiet:true});

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI).then(()=>{
    console.log("DB Connected!!")
    app.listen(PORT,()=>{
        console.log("Server Is Listening on PORT:",PORT);
    })
}).catch(err=>{
    console.error("Internal Error",err);
    
})
