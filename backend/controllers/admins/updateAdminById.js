const createError = require("../../middlewares/errors/errorHandling");
const updateAdminByIdService = require("../../services/admins/updateAdminByIdService");
const userModel = require("../../models/userModel");

const updateAdminById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(createError(400, "Provide user id to update"));

    const { username, email } = req.body;
    if (!username?.trim() && !email?.trim()) {
      return next(createError(400, "Provide username or email to update"));
    }

    // Prevent Admin from updating a Super Admin
    if (req.user.role === "admin") {
      const targetUser = await userModel.findById(id);
      if (targetUser && targetUser.role === "superadmin") {
        return next(
          createError(
            403,
            "You do not have permission to update a Super Admin.",
          ),
        );
      }
    }

    const user = await updateAdminByIdService(id, { username, email });
    
    if (!user) return next(createError(404, "Not found user with this id"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      // FIX: Added 400 status code
      return next(createError(400, `${messages.join(", ")}`));
    }
    next(error);
  }
};
module.exports = updateAdminById;
