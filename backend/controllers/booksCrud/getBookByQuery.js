const getBookByQueryService = require("../../services/booksCrud/getBookByQueryService");

const getBookByQuery = async (req, res, next) => {
  try {
    const { searchTerm, genre, page, limit, latest, top, mustOffer } =
      req.query;

    const result = await getBookByQueryService({
      searchTerm,
      genre,
      page,
      limit,
      latest,
      top,
      mustOffer,
    });

    res.status(200).json({
      success: true,
      data: result.books,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBookByQuery;
