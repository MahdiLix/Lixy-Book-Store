const User = require("../../../models/User.js");

const changeUserPasswordService = async (id, currentPassword, newPassword) => {
  const user = await User.findById(id).select("+password");
  if (!user) return null;

  // Verify old password before allowing change
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    return "incorrect";
  }

  user.password = newPassword.trim();
  await user.save();
  return user;
};
module.exports = changeUserPasswordService;
