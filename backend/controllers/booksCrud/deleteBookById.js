const createError = require("../../middlewares/errors/errorHandling");
const deleteBookByIdService = require("../../services/booksCrud/deleteBookByIdService");

const deleteBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(createError(400, "provide book id to remove"));

    const deletedBook = await deleteBookByIdService(id);

    if (!deletedBook) {
      return next(createError(404, "Book not found with this id"));
    }

    res.status(200).json({
      success: true,
      message: `Removed book by id: ${id} `,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(createError(400, "Invalid book id format"));
    }
    next(error);
  }
};

module.exports = deleteBookById;
