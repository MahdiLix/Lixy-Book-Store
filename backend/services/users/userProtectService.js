const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../../models/userModel");


const decodeUserService = async (token) => {
  const decodeUser = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
  const currentUser = await userModel.findById(decodeUser.id); //find by db id -> 6a084fa00291285802ad12d8

  return currentUser
}

module.exports = decodeUserService;