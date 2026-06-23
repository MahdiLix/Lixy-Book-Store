const bookModel = require("../../models/bookModel");

const getBookByQueryService = async (queryParams = {}) => {
  const {
    searchTerm = "",
    page = 1,
    limit = 10,
    latest = false, // true => only books added in the last month
  } = queryParams;

  let filter = {};

  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
      { genre: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (latest === true || latest === "true") {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    filter.createdAt = { $gte: oneMonthAgo };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [books, total] = await Promise.all([
    bookModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    bookModel.countDocuments(filter),
  ]);

  return {
    books,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
    },
  };
};

module.exports = getBookByQueryService;