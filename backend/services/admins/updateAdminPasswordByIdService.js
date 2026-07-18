const createError = require("../../middlewares/errors/errorHandling");
const userModel = require("../../models/userModel");

const updateAdminPasswordByIdService = async (
  id,
  currentAdminPass,
  newAdminPass,
) => {
  const admin = await userModel.findById(id).select("+password");

  if (!admin) {
    return null;
  }
  // Verify old password before allowing change
  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    throw createError(401, "Current password is incorrect");
  }

  admin.password = newAdminPass.trim();
  await admin.save();

  return admin;
};

module.exports = updateAdminPasswordByIdService;
