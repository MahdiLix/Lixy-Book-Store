const createError = require("../../middlewares/errors/errorHandling");
const userModel = require("../../models/userModel");

const updateUserPasswordService = async (id, currentPassword, newPassword) => {
  const user = await userModel.findById(id).select("+password");
  if (!user) return null;

  // Verify old password before allowing change
  const isMatch = await user.comparePassword(currentPassword);
  
  if (!isMatch) {
    return "incrorrect";
  }

  user.password = newPassword.trim();
  await user.save();
  return user;
};
module.exports = updateUserPasswordService;
