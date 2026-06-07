const bookModel = require("../../models/bookModel");

const deleteBookById = async (req, res, next) => {
   try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "provide book _id to remove",
      });
    }
    const deletedBook = await bookModel.findByIdAndDelete( id );  
 
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Removed book by _ID: ${id} `,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBookById;
