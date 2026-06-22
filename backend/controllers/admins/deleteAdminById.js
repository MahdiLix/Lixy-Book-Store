 const createError = require("../../middlewares/errors/errorHandling");
const deleteAdminByIdService = require("../../services/admins/deleteAdminService");

const deleteAdminById = async (req, res, next) => {
  try {
 
    const id = req.params.id;
    if (!id) {
      return next(createError(400, "provide user id to remove"));
    }
    
    const deletedAdmin = await deleteAdminByIdService(id)

    if (!deletedAdmin) {
      return next(createError(404, "Admin not found!"));
    }
    res.status(200).json({
      success: true,
      message: `Removed admin by id: ${id} `,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = deleteAdminById;