const userModel = require("../../models/userModel");

const getAdminByIdService = async (id) => {
  return await userModel.findById(id).select("-password");
};
module.exports = getAdminByIdService;