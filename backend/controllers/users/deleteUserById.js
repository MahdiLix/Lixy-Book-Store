const createError = require("../../middlewares/errors/errorHandling");
const deleteUserByIdService = require("../../services/users/deleteUserByIdService");

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await deleteUserByIdService(id);

    if (!deletedUser) return next(createError(404, "User not found!"));

    res
      .status(200)
      .json({ success: true, message: `Removed user by id: ${id}` });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteUserById;
