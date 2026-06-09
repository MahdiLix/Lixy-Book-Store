const getBookByQueryService = require("../../services/booksCrud/getBookByQueryService");
 
const getBookByQuery = async (req, res, next) => {
  try {
    const searchTerm = req.query.q;
 
    const books = await getBookByQueryService(searchTerm);
 
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBookByQuery;