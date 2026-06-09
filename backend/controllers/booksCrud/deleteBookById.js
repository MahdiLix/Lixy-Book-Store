const createError = require("../../middlewares/errors/errorHandling");
const deleteBookByIdService = require("../../services/booksCrud/deleteBookByIdService");

const deleteBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(createError(400, "provide book _id to remove"));
    }
    const deletedBook = await deleteBookByIdService(id);

    if (!deletedBook) {
      return next(createError(404, "Book not found!"));
    }
    
    res.status(200).json({
      success: true,
      message: `Removed book by _ID: ${id} `,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBookById;
