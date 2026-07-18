const bookModel = require("../../models/bookModel");
const deleteUploadImage = require("../../middlewares/deleteUploadImage");

const deleteBookByIdService = async (id) => {
  const book = await bookModel.findById(id);

  if (!book) return null; // handle responce by controller

  const bookPath = book.bookImage;

  if (bookPath?.trim()) {
    await deleteUploadImage(bookPath);
  }

  await book.deleteOne();
  return book;  
};

module.exports = deleteBookByIdService;
