const bookModel = require("../../models/bookModel");

const getBookByIdService = async (bookId = "") => {
  return await bookModel.incrementView(bookId);
};

module.exports = getBookByIdService;
