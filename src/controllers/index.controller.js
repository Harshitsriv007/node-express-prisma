const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../services/index.service');
const AppError = require('../utils/AppError');


exports.getUsers = async (req, res, next) => {
  try{
    const users = await getAllUsers();
    res.status(200).json(users);  
  }catch(error){    
    next(error);
  }  
}

exports.getUserById = async (req, res, next) => {
  try{
    const {id} = req.params;
    if(!id){
      return next(new AppError("User ID is required", 400));
    }
    const users = await getUserById(id);
    res.status(200).json(users);  
  }catch(error){    
    next(error);
  }  
}

exports.createUser = async (req, res, next) => {
  try{
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);  
  }catch(error){    
    next(error);
  }  
}

exports.updateUser = async (req, res, next) => {
  try{
    const {id} = req.params;
    if(!id){
      return next(new AppError("User ID is required", 400));
    }
    const userData = req.body;
    const userUpdate = await updateUser(id,userData);
    res.status(200).json(userUpdate);  
  }catch(error){    
    next(error);
  }  
} 

exports.deleteUser = async (req, res, next) => {
  try{
    const {id} = req.params;
    if(!id){
      return res.status(400).json({message: "User ID is required"});
    }
    await deleteUser(id);
    res.status(200).json({message: `User with ID ${id} deleted successfully`});  
  }catch(error){    
    next(error);
  }  
}