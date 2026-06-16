const createError = require("../../middlewares/errors/errorHandling");
const updateAdminByIdService = require("../../services/admins/updateAdminByIdService");
const updateAdminPassByIdService = require("../../services/admins/updateAdminPassByIdService");

const updateAdminPassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    if (!id) {
      return next(createError(400, "provide admin id to update"));
    }

    if (!password?.trim()) {
      return next(createError(400, "Provide new password"));
    }

    const admin = await updateAdminPassByIdService(id, password);

    if (!admin) {
      return next(createError(404, "Admin not found"));
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(`${messages.join(", ")}`));
    }

    next(error);
  }
};
module.exports = updateAdminPassById;
