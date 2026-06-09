const createError = require("../../middlewares/errors/errorHandling");
const getBookByIdService = require("../../services/booksCrud/getBookByIdService");

const getBookById = async (req, res, next) => {
  try {
    const book = await getBookByIdService(req.params.id);
    
    if (!book) {
      return next(createError(404,`Not found book with ID ${id || ''}` ));
    }
    res.status(200).json({
      success: true,
      data: book
    })

  } catch (error) {
    next(error)
  }
}

module.exports = getBookById;