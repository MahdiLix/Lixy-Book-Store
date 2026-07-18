const createError = require("../../middlewares/errors/errorHandling");
const getUserByIdService = require("../../services/users/getUserByIdService");

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);

    if (!user) return next(createError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
module.exports = getUserById;
