const deleteUpload = require("../../../middlewares/uploads/deleteUpload.js");
const appError = require("../../../middlewares/error.js");
const updateBookService = require("../services/updateBook.js");


const updateBookController = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(appError(400, "provide book id to update"));

    const book = await updateBookService(id, req.body, req.file);

    if (!book) {
      // If book not found, but a file was uploaded, delete the orphaned file!
      if (req.file) await deleteUpload(req.file.path);
      return next(appError(404, "Book not found with this id"));
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (req.file) {
      await deleteUpload(req.file.path);
    }

    if (error.name === "CastError") {
      return next(appError(400, "Invalid book id format"));
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(appError(400, `${messages.join(", ")}`));
    }
    if (error.code === 11000) {
      return next(appError(409, "title or author already exists!"));
    }

    next(error);
  }
};

module.exports = updateBookController;
