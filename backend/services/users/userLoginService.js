const createError = require("../../middlewares/errors/errorHandling");
const userModel = require("../../models/userModel");
const jsonwebtoken = require("jsonwebtoken");


const authToken = (userId) => {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN || "30d",
  });
};

const loginService = async (userData) => {
  const { email, password } = userData;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw createError(401, "Invalid credentials");
  }
 
  const matchPass = await user.comparePassword(password);
  if (!matchPass) {
    throw createError(401, "Invalid credentials");
  }
  // remove pass for security
  user.password = undefined;
 
  return authToken(user._id) //db _id: 6a084fa00291285802ad12d8
  
}

module.exports = loginService;
