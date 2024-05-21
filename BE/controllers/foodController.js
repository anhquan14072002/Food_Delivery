import foodModel from "../models/foodModel.js";
import {addFoodRepository,findFoodById,listFoodRepository, removeFoodRepository} from "../repositories/foodRepository.js";
import fs from "fs"


//add food item

const addFood = async (req,res)=>{
  const image_filename = `${req.file.filename}`

  const food =new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image: image_filename
  })

  const result = await addFoodRepository(food);
  res.json(result);
}

const listFood = async (req,res)=>{
    const result = await listFoodRepository();
     res.json(result);
}

const removeFood = async (req,res)=>{
try {
    const food =await findFoodById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await removeFoodRepository(req.body.id);
    res.json({success:true, message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false, message:"Erorr"})
}
}
export{addFood, listFood,removeFood}