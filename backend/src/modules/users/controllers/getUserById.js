const appError = require("../../../middlewares/error");
const getUserByIdService = require("../services/getUserById");
 
const getUserByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);

    if (!user) return next( appError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
module.exports = getUserByIdController;
