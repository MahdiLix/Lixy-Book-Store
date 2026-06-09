const bookModel = require("../../models/bookModel");

const putBookByIdService = async (id, bookData) => {
  // ensure user don't change ISBN
  if (bookData.isbn) delete bookData.isbn;

  return await bookModel.findByIdAndUpdate(
    id,
    bookData, {
    returnDocument: 'after',
    runValidators: true,
  });

};
  
module.exports = putBookByIdService;
