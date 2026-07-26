const appError = require("../../../middlewares/error");
const deleteUserService = require("../services/deleteUser");

const deleteUserController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await deleteUserService(id);

    if (!deletedUser) return next(appError(404, "User not found!"));

    res
      .status(200)
      .json({ success: true, message: `Removed user by id: ${id}` });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteUserController;
