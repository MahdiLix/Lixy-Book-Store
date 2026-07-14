const bookModel = require("../../models/bookModel");

const postNewBookService = async (bookBody, bookFile) => {
  const data = { ...bookBody };

  delete data.isbn;
  delete data.bookImage;
  delete data.discountHours; // No needed in backend side
  delete data.discountedPrice; // Mongo middlewares calculate automatically

  if (data.publishedYear === "") delete data.publishedYear;
  if (data.genre === "") delete data.genre;

  if (data.discount === "" || data.discount === 0) {
    delete data.discount;
    delete data.discountEndDate;
  }

  if (bookFile && bookFile.filename) {
    data.bookImage = `/uploads/${bookFile.filename}`;
  }

  const book = new bookModel(data);

  return await book.save();
};

module.exports = postNewBookService;
