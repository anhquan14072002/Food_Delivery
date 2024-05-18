import foodModel from "../models/foodModel.js";


const addFoodRepository = async (foodData) => {
  const food = new foodModel(foodData);
  try {
    await food.save();
    return { success: true, message: "Food Added" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error" };
  }
};

const listFoodRepository = async () => {
  try {
    const foods = await foodModel.find({});
    return({ succsess: true, data: foods });
  } catch (error) {}
};

const findFoodById = async (id) => {
  return await foodModel.findById(id);
};
const removeFoodRepository = async (id) => {
  return await foodModel.findByIdAndDelete(id);
}
export {addFoodRepository,listFoodRepository,findFoodById,removeFoodRepository}