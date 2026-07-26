const User = require("../../../models/User");

const getAllAdminsService = async () => {
  return await User.find({ role: "admin" }).select("-password");
};
module.exports = getAllAdminsService;
