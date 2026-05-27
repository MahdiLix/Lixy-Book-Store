const bookModel = require("../../models/bookModel");

const postNewBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear, genre, availableCopies } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "provide book title and author" });
    }

    // * DELETE null value for apply mongoDB default value:
    delete req.body.isbn; // USER CANNOT ENTER ISBN
    if (publishedYear == null) delete req.body.publishedYear;
    if (genre == null) delete req.body.genre;
    if (availableCopies == null) delete req.body.availableCopies;

    const newBook = await bookModel.create(req.body);

    return res.status(201).json({
      success: true,
      book: newBook,
    });
  } catch (error) {
    // database error hadling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "a book with this ISBN already exists!",
      });
    }

    next(error);
  }
};

module.exports = postNewBook;
