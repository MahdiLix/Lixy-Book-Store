const userModel = require("../../models/userModel");

const deleteAdminByIdService = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
module.exports = deleteAdminByIdService;