const User = require("../../../models/User.js");
const appError = require("../../../middlewares/error.js");
const changeAdminPasswordService = require("../services/changeAdminPassword.js");


const changeAdminPasswordController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!id) return next(appError(400, "provide admin id to update"));

    if (!currentPassword?.trim() || !newPassword?.trim())
      return next(appError(400, "Provide current password and new password"));

    // Prevent Admin from changing Super Admin's password
    if (req.user.role === "admin") {
      const targetUser = await User.findById(id);
      if (targetUser && targetUser.role === "superadmin") {
        return next(
          appError(403, "You do not have permission to modify a Super Admin."),
        );
      }
    }

    const admin = await changeAdminPasswordService(
      id,
      currentPassword,
      newPassword,
    );
    if (!admin) return next(appError(404, "Admin not found"));

    if (admin === "incorrect") {
      return next(appError(401, "Current password is incorrect"));
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      // FIX: Added 400 status code
      return next(appError(400, `${messages.join(", ")}`));
    }
    next(error);
  }
};
module.exports = changeAdminPasswordController;
