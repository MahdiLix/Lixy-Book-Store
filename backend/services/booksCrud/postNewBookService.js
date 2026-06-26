const bookModel = require("../../models/bookModel");

const postNewBookService = async (bookBody, bookFile) => {
  const data = { ...bookBody };
  const { title, author, publishedYear, genre, availableCopies } = data;

  // ADMIN CANNOT ENTER ISBN, bookImage in body
  delete data.isbn;
  delete data.bookImage;

  if (publishedYear == null) delete data.publishedYear;
  if (genre == null) delete data.genre;
  if (availableCopies == null) delete data.availableCopies;

  if (bookFile && bookFile.filename) {
    data.bookImage = `/uploads/${bookFile.filename}`;
  }

  return await bookModel.create(data);
};

module.exports = postNewBookService;
