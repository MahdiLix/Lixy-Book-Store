const User = require("../../../models/User.js");
 
const changeAdminPasswordService = async (id, currentPassword, newPassword) => {
  const admin = await User.findById(id).select("+password");

  if (!admin) return null;

  // Verify old password before allowing change
  const isMatch = await admin.comparePassword(currentPassword);

  if (!isMatch) {
    return "incorrect";
  }

  admin.password = newPassword.trim();
  await admin.save();

  return admin;
};

module.exports = changeAdminPasswordService;
