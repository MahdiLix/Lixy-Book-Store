const createError = require("../../middlewares/errors/errorHandling");
const updateAdminByIdService = require("../../services/admins/updateAdminByIdService");

const updateAdminById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(createError(400, "Provide user id to update"));
    }
    // 1. Removed 'Password' from destructuring for security
    const { username, email } = req.body;

    if (!username?.trim() && !email?.trim()) {
      return next(createError(400, "Provide username or email to update"));
    }

    const user = await updateAdminByIdService(id, { username, email });

    if (!user) {
      return next(createError(404, "Not found user with this id"));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(`${messages.join(", ")}`));
    }

    next(error);
  }
};
module.exports = updateAdminById;
