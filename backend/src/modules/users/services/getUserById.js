const User = require("../../../models/User");

const getUserByIdService = async (id) => {
  return await User.findById(id).select("-password");
};
module.exports = getUserByIdService;
