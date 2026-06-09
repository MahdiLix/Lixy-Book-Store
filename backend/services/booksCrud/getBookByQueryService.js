const bookModel = require("../../models/bookModel");

const getBookByQueryService = async (searchTerm = "") => {
  let filter = {};
  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
      { genre: { $regex: searchTerm, $options: "i" } }
    ];
  }

  return await bookModel.find(filter);
 
};

module.exports = getBookByQueryService;
