const bookModel = require("../../models/bookModel");

const updateBookByIdService = async (id, bookData) => {
  const data = { ...bookData };
  
  // ensure user don't change ISBN
  if (data.isbn) {
    delete data.isbn;
  }
  return await bookModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

module.exports = updateBookByIdService;
