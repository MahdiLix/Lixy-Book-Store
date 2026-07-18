const createError = require("../../middlewares/errors/errorHandling");
const updateBookByIdService = require("../../services/booksCrud/updateBookByIdService");
const deleteUploadImage = require("../../middlewares/deleteUploadImage"); // FIX: Added import

const updateBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(createError(400, "provide book id to update"));

    const book = await updateBookByIdService(id, req.body, req.file);

    if (!book) {
      // If book not found, but a file was uploaded, delete the orphaned file!
      if (req.file) await deleteUploadImage(req.file.path);
      return next(createError(404, "Book not found with this id"));
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (req.file) {
      await deleteUploadImage(req.file.path);
    }

    if (error.name === "CastError") {
      return next(createError(400, "Invalid book id format"));
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, `${messages.join(", ")}`));
    }
    if (error.code === 11000) {
      return next(createError(409, "title or author already exists!"));
    }

    next(error);
  }
};

module.exports = updateBookById;
