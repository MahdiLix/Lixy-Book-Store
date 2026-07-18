const createError = require("../../middlewares/errors/errorHandling");
const updateAdminPassByIdService = require("../../services/admins/updateAdminPasswordByIdService");
const userModel = await require("../../models/userModel");

const updateAdminPassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { currentPassword, newpassword } = req.body;

    if (!id) return next(createError(400, "provide admin id to update"));
    if (!currentPassword?.trim() || !newpassword?.trim())
      return next(createError(400, "Provide current password and new password"));

    // Prevent Admin from changing Super Admin's password
    if (req.user.role === "admin") {
      const targetUser = await userModel.findById(id);
      if (targetUser && targetUser.role === "superadmin") {
        return next(
          createError(
            403,
            "You do not have permission to modify a Super Admin.",
          ),
        );
      }
    }

    const admin = await updateAdminPassByIdService(id, currentPassword, newpassword);
    if (!admin) return next(createError(404, "Admin not found"));

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      // FIX: Added 400 status code
      return next(createError(400, `${messages.join(", ")}`));
    }
    next(error);
  }
};
module.exports = updateAdminPassById;
