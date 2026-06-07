const userModel = require("../../../models/userModel");

const deleteAdminById = async (req, res, next) => {
  try {
    console.log('from delete admin', req.params.id)
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "provide user _id to remove",
      });
    }

    const deletedAdmin = await userModel.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Removed admin by _ID: ${id} `,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = deleteAdminById;