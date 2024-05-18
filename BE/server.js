import express from 'express';
import cors from'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

//app config
const app = express()


//middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res) =>{
    res.send('Api working')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)