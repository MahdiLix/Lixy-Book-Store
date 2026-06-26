const createError = require("../../middlewares/errors/errorHandling");
const bookModel = require("../../models/bookModel");
const updateBookByIdService = require("../../services/booksCrud/updateBookByIdService");

const updateBookById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return next(createError(400, "provide book id to update"));
    }

    const book = await updateBookByIdService(id, req.body, req.file);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, `${messages.join(", ")}`));
    }
    if (error.code === 11000) {
      return next(createError(409, "title or author already exists!"));
    }

    next(error);
  }
};

module.exports = updateBookById;
