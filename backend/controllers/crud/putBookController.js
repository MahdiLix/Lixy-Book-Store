const bookModel = require("../../models/bookModel");

const putBookById = async (req, res, next) => {
  try {
    
    const id = req.params.id;
   
     if (!id) {
      return res.status(400).json({
        message: "provide book _id to update",
      });
    }
      // ensure user don't change ISBN
    if (req.body.isbn) delete req.body.isbn;

    const book = await bookModel.findByIdAndUpdate(
      id,
      req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        message: "Not found book with this _id",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error.errors === "ValidationError") {
      const message = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: message.join(", "),
      });
    }
    next(error);
  }
};

module.exports = putBookById;
