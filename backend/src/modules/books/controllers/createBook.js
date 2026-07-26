const createBookService = require("../services/createBook.js");
const appError = require("../../../middlewares/error.js");
const deleteUpload = require("../../../middlewares/uploads/deleteUpload.js");


const createBookController = async (req, res, next) => {
  try {
    const { title, author } = req.body;

    if (!title?.trim() || !author?.trim()) {
      // multer already wrote req.file to disk — clean it up before rejecting
      if (req.file) {
        await deleteUpload(req.file.path);
      }

      return next(appError(400, "provide book title and author"));
    }

    if (!req.file) {
      return next(appError(400, "No file uploaded"));
    }

    const newBook = await createBookService(req.body, req.file);

    res.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (error) {
    // If service call failed, clean up file
    if (req.file) {
      await deleteUpload(req.file.path);
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(appError(400, `${messages.join(", ")}`));
    }

    if (error.code === 11000) {
      return next(appError(409, "a book with this ISBN already exists!"));
    }

    next(error);
  }
};

module.exports = createBookController;
