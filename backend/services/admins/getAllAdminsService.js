const userModel = require("../../models/userModel");

const getAllAdminsService = async () => {
  return await userModel.find({ role: "admin" }).select("-password");
};
module.exports = getAllAdminsService;
