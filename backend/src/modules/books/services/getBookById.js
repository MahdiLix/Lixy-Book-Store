const Book = require('../../../models/Book')

const getBookByIdService = async (bookId = "") => {
  return await Book.incrementView(bookId);
};

module.exports = getBookByIdService;
