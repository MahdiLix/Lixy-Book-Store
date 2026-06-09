const bookModel = require("../../models/bookModel");

const deleteBookByIdService = async (id) => {
 return await bookModel.findByIdAndDelete(id);
};

module.exports = deleteBookByIdService;
