const userModel = require("../../models/userModel");

const getAllUsersService = async () => {
  return await userModel.find({ role: "user" }).select("-password");
};
module.exports = getAllUsersService;
