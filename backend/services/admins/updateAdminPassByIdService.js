const userModel = require("../../models/userModel");

const updateAdminPassByIdService = async (id, newAdminPass) => {
  const admin = await userModel.findById(id).select("+password");

  if (!admin) {
    return null;
  }
  admin.password = newAdminPass.trim();
  const update = await admin.save();
 
  return update;
};

module.exports = updateAdminPassByIdService;
