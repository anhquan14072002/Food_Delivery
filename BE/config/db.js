import mongoose, { connect }  from "mongoose";



export const connectDB = async ()=>{
await mongoose.connect(process.env.MONG_URL).then(()=>console.log('DB Connected', process.env.PORT))
}

