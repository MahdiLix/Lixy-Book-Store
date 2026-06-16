const createError = require("../../middlewares/errors/errorHandling");
const putAdminByIdService = require("../../services/admins/putAdminByIdService");

const putAdminById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(createError(400, "provide user _id to update"));
    }
    const user = await putAdminByIdService(id, req.body)

    if (!user) {
      return next(createError(404, "Not found user with this _id"));
    }
    console.log('user after update by superadmin', user);
 
    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(`${messages.join(', ')}`));
    }

    next(error);
  }
}
module.exports = putAdminById;
