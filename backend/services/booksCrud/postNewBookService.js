const bookModel = require("../../models/bookModel");

const postNewBookService = async (bookData) => {

  const { title, author, publishedYear, genre, availableCopies } = bookData;

  // * DELETE null value for apply mongoDB default value:
  delete bookData.isbn; // USER CANNOT ENTER ISBN
  if (publishedYear == null) delete bookData.publishedYear;
  if (genre == null) delete bookData.genre;
  if (availableCopies == null) delete bookData.availableCopies;

  return await bookModel.create(bookData)

};

module.exports = postNewBookService;
