const userModel = require("../../models/userModel");

const deleteUserByIdService = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
module.exports = deleteUserByIdService;