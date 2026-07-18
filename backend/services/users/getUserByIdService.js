const userModel = require("../../models/userModel");

const getUserByIdService = async (id) => {
  return await userModel.findById(id).select("-password");
};
module.exports = getUserByIdService;