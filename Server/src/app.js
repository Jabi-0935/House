import express from 'express'
import cors from 'cors'

import {authRoutes} from './routes/authRoutes.js'
import { propertyRoutes } from './routes/propertyRoutes.js';

const app = express();
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(`${req.method} on ${req.path}`);
    next()
})
app.use('/',authRoutes)
app.use('/',propertyRoutes)


app.get('/',(req,res)=>{
    res.json("Hello From House server")
})


export default app;