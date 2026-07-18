const createError = require("../../middlewares/errors/errorHandling");
const updateUserPasswordService = require("../../services/users/updateUserPasswordService");

const updateUserPassword = async (req, res, next) => {
  try {
    const id = req.params.id;  
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword?.trim() || !newPassword?.trim()) {
      return next(
        createError(400, "Provide current password and new password"),
      );
    }

    const user = await updateUserPasswordService(id, currentPassword, newPassword);

    if (!user) return next(createError(404, "User not found"));
 
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = updateUserPassword;
