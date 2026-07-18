const createError = require("../../middlewares/errors/errorHandling");
const updateUserByIdService = require("../../services/users/updateUserByIdService");

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // prevent to logged-in user cannot change someone else profile by guessing their ID ..
    if (req.user.role === "user" && req.user.id !== req.params.id) {
      return next(createError(403, "You can only update your own profile!"));
    }
    const { username, email } = req.body;

    if (!username?.trim() && !email?.trim()) {
      return next(createError(400, "Provide username or email to update"));
    }

    const user = await updateUserByIdService(id, { username, email });
    if (!user) return next(createError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
module.exports = updateUserById;
