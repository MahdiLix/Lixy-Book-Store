const Book = require("../../../models/Book");
const deleteUpload = require("../../../middlewares/uploads/deleteUpload");

const deleteBookService = async (id) => {
  const book = await Book.findById(id);

  if (!book) return null; // handle responce by controller

  const bookPath = book.bookImage;

  if (bookPath?.trim()) {
    await deleteUpload(bookPath);
  }

  await book.deleteOne();
  return book;
};

module.exports = deleteBookService;
