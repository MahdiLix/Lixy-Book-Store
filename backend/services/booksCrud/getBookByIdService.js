const bookModel = require("../../models/bookModel");

console.log("BOOK MODEL:", bookModel);

const getBookByIdService = async (bookId = "") => {
  return await bookModel.incrementView(bookId);
};



module.exports = getBookByIdService;
