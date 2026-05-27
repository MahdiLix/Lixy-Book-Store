// const bookModel = require("../../models/bookModel");

// const getBookByIsbn = async (req, res, next) => {
//   try {
//     const isbn = req.params.isbn;
//     const allowedNumRegex = /^[0-9]+$/;

//     if (!isbn || !allowedNumRegex.test(isbn)) {
//       return res.status(400).json({
//         message: "ISBN only contain digits",
//       });
//     }

//     const book = await bookModel.findOne({ isbn });
//     if (!book) {
//       return res.status(404).json({
//         message: `Not found book by this ISBN ${isbn}`,
//       });
//     }
//     delete req.params.isbn
//     req.params.id = book._id;
//     console.log(req.url)
//      next();

//   } catch (error) {
//     next(error);
//   }
// };
// module.exports = getBookByIsbn;
