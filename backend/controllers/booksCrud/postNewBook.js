const fs = require("fs");
const createError = require("../../middlewares/errors/errorHandling");
const postNewBookService = require("../../services/booksCrud/postNewBookService");

const postNewBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;

    if (!title?.trim() || !author?.trim()) {
      // multer already wrote req.file to disk — clean it up before rejecting
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err)
            console.error(
              `Failed to remove orphaned upload: ${req.file.path}`,
              err,
            );
        });
      }
      return next(createError(400, "provide book title and author"));
    }

    if (!req.file) {
      return next(createError(400, "No file uploaded"));
    }

    const newBook = await postNewBookService(req.body, req.file);
    console.log("Newbook added to db -> postNewBook.js", newBook);

    res.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (error) {
    // If service call failed, clean up file
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err)
          console.error(
            `Failed to remove orphaned upload: ${req.file.path}`,
            err,
          );
      });
    }
    // database error hadling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, `${messages.join(", ")}`));
    }

    if (error.code === 11000) {
      return next(createError(409, "a book with this ISBN already exists!"));
    }

    next(error);
  }
};

module.exports = postNewBook;
