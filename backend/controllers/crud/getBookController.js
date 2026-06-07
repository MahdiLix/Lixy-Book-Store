const bookModel = require("../../models/bookModel");

const getBookByQuery = async (req, res, next) => {
  try {
    const searchTerm = req.query.q;

    let filter = {};
    if (searchTerm) {
      filter.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { author: { $regex: searchTerm, $options: "i" } },
        { genre: { $regex: searchTerm, $options: "i" } }
      ];
    }
     //  if (sort) {
    //   queryBook = queryBook.sort(sort);
    // }
    const books = await bookModel.find(filter);

    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBookByQuery;
