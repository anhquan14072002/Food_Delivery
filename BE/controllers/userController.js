import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";

//Token
const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECERT)
}
//Login user
const loginUser = async (req,res) => {
  const {  password, email } = req.body;
try {
    const user =  await userModel.findOne({email});
    if(!user){
      return res.json({ success: false, message: "User doesn't exist " });

    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id)
    res.json({success:true,token})
} catch (error) {
    res.json({ success: false, message: "Error" });
    
}
};
//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
  
    try {
      // Check if user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
  
      // Validate password
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Please enter a strong password" });
      }
  
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      // Create and save new user
      const newUser = new userModel({
        name,
        email,
        password: hashPassword,
      });
      const user = await newUser.save();
  
      // Create token
      const token = createToken(user._id);
      res.status(201).json({ success: true, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export { loginUser, registerUser };
