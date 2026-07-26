const User = require("../../../models/User");

const deleteAdminService = async (id) => {
  return await User.findByIdAndDelete(id);
};
module.exports = deleteAdminService;
