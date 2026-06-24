const deleteUploadImage = require("../../middlewares/deleteUploadImage");
const bookModel = require("../../models/bookModel");
const createError = require("../../middlewares/errors/errorHandling");

const deleteBookByIdService = async (id) => {
  const book = await bookModel.findById(id);
  
  if (!book) {
    throw createError(404, "Book not found with this id");
  }

  const bookPath = book.bookImage;

  if (bookPath?.trim()) {
    await deleteUploadImage(bookPath);
  }

  await book.deleteOne();
};

module.exports = deleteBookByIdService;
