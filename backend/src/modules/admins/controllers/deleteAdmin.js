const appError = require("../../../middlewares/error.js");
const deleteAdminService = require("../services/deleteAdmin.js");

const deleteAdminController = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(appError(400, "provide user id to remove"));

    // Prevent Super Admin from deleting themselves
    if (req.user.id === id) {
      return next(appError(400, "You cannot delete your own account!"));
    }

    const deletedAdmin = await deleteAdminService(id);
    if (!deletedAdmin) return next(appError(404, "Admin not found!"));

    res
      .status(200)
      .json({ success: true, message: `Removed admin by id: ${id}` });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteAdminController;
