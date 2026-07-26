const User = require("../../../models/User");

const getAdminByIdService = async (id) => {
  return await User.findById(id).select("-password");
};
module.exports = getAdminByIdService;
