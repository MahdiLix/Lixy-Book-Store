const appError = require("../../../middlewares/error");
const deleteBookService = require("../services/deleteBook");

const deleteBookController = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(appError(400, "provide book id to remove"));

    const deletedBook = await deleteBookService(id);

    if (!deletedBook) {
      return next(appError(404, "Book not found with this id"));
    }

    res.status(200).json({
      success: true,
      message: `Removed book by id: ${id} `,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(appError(400, "Invalid book id format"));
    }
    next(error);
  }
};

module.exports = deleteBookController;
