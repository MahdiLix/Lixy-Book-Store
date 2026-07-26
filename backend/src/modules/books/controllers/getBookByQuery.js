const getBookByQueryService = require("../services/getBookByQuery");

const getBookByQueryController = async (req, res, next) => {
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

module.exports = getBookByQueryController;
