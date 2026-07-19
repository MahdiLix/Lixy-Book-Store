const createError = require("../../middlewares/errors/errorHandling");
const userModel = require("../../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

const authToken = (userId) => {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN || "30d",
  });
};

const loginService = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return null;

  const matchPass = await user.comparePassword(password);

  if (!matchPass) {
    return "incorrect";
  }
  // remove pass for more security
  user.password = undefined;

  return authToken(user._id); //db id is like: 6a084fa00291285802ad12d8
};

module.exports = loginService;
