import express from 'express'
import cors from 'cors'

import {authRoutes} from './routes/authRoutes.js'

const app = express();
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(`${req.method}`);
    next();
})
app.use('/',authRoutes)

app.get('/',(req,res)=>{
    res.json("Hello From House server")
})


export default app;