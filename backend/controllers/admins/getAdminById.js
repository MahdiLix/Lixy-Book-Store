const createError = require("../../middlewares/errors/errorHandling");
const getAdminByIdService = require("../../services/admins/getAdminByIdService");

const getAdminById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getAdminByIdService(id);

    if (!user) return next(createError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
module.exports = getAdminById;
