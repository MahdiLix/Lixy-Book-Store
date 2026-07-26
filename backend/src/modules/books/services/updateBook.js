const Book = require("../../../models/Book");
const deleteUpload = require("../../../middlewares/uploads/deleteUpload");

const updateBookService = async (id, bookData, bookFile) => {
  const book = await Book.findById(id);

  if (!book) return null;

  const oldBookImage = book.bookImage;

  const data = { ...bookData };

  delete data.isbn;
  delete data.bookImage;

  if (bookFile && bookFile?.filename) {
    data.bookImage = `/uploads/${bookFile.filename}`;
  }

  Object.assign(book, data);
  const updatedBook = await book.save();

  // remove old image from uploads path
  if (
    oldBookImage &&
    bookFile &&
    bookFile.filename &&
    oldBookImage !== updatedBook.bookImage
  ) {
    await deleteUpload(oldBookImage);
  }

  return updatedBook;
};

module.exports = updateBookService;
