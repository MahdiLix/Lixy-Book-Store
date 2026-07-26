const appError = require("../../../middlewares/error.js");
const getAdminByIdService = require("../services/getAdminById.js");

const getAdminByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getAdminByIdService(id);

    if (!user) return next(appError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
module.exports = getAdminByIdController;
