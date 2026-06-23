const getBookByQueryService = require("../../services/booksCrud/getBookByQueryService");

const getBookByQuery = async (req, res, next) => {
  try {
    const { searchTerm, page, limit, latest } = req.query;

    const result = await getBookByQueryService({
      searchTerm,
      page,
      limit,
      latest,
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