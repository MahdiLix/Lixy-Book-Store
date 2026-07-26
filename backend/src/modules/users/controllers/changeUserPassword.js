const appError = require("../../../middlewares/error");
const changeUserPasswordService = require("../services/changeUserPassword");

const changeUserPasswordController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword?.trim() || !newPassword?.trim()) {
      return next(appError(400, "Provide current password and new password"));
    }

    const user = await changeUserPasswordService(
      id,
      currentPassword,
      newPassword,
    );

    if (!user) return next(appError(404, "User not found"));

    if (user === "incorrect") {
      return next(appError(401, "Current password is incorrect"));
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = changeUserPasswordController;
