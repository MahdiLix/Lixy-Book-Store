const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../../models/userModel");

const decodeUserService = async (token) => {
  const decodeUser = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await userModel.findById(decodeUser.id);

  if (!currentUser) return null;

  return currentUser;
};

module.exports = decodeUserService;
