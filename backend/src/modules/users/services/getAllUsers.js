const User = require("../../../models/User");

const getAllUsersService = async () => {
  return await User.find({ role: "user" }).select("-password");
};
module.exports = getAllUsersService;
