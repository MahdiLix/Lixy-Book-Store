const bookModel = require("../../models/bookModel");

const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await bookModel.findById(id);

    if (!book) {
      return res.status(404).json({
        message: `Not found book with ID ${id || ''}`
      })
    }

    return res.status(200).json({
      success: true,
      data: book
    })

  } catch (error) {
    next(error)
  }
}

module.exports = getBookById;