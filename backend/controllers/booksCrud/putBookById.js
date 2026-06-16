const createError = require("../../middlewares/errors/errorHandling");
const bookModel = require("../../models/bookModel");
const putBookByIdService = require("../../services/booksCrud/putBookByIdService");

const putBookById = async (req, res, next) => {
  try {

    const id = req.params.id;

    if (!id) {
      return next(createError(400, "provide book _id to update"));
    }
    const book = await putBookByIdService(id, req.body);
    if (!book) {
      return next(createError(404, "Not found book with this _id"));
    }
    console.log('book after update', book)
    res.status(200).json({
      success: true,
      data: book,
    });
    
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, `${messages.join(', ')}`));
    }

    next(error);
  }
};

module.exports = putBookById;
