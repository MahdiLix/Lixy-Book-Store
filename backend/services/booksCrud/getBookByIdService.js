const bookModel = require("../../models/bookModel");

const getBookByIdService = async (id = "") => {
   return await bookModel.findById(id)
  
}

module.exports = getBookByIdService;