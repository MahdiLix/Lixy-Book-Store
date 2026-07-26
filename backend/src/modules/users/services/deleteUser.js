const User = require("../../../models/User");

const deleteUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};
module.exports = deleteUserService;
