const createError = require("../../middlewares/errors/errorHandling");
const getBookByIdService = require("../../services/booksCrud/getBookByIdService");

const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await getBookByIdService(id);

    if (!book) {
      return next(createError(404, `Not found book with id ${id || ""}`));
    }
    
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    // FIX: Handle CastError for invalid MongoDB IDs
    if (error.name === "CastError") {
      return next(createError(400, "Invalid book id format"));
    }
    next(error);
  }
};

module.exports = getBookById;