const bookModel = require("../../models/bookModel");

const deleteBookById = async (req, res, next) => {
   try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "provide book _id to remove",
      });
    }
    await bookModel.findByIdAndDelete( id );
    
    return res.status(200).json({
      success: true,
      message: `Removed book with _ID: ${id} `,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBookById;
