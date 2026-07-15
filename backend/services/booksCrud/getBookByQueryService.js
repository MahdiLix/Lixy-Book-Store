const bookModel = require("../../models/bookModel");

const getBookByQueryService = async (queryParams = {}) => {
  const {
    searchTerm = "",
    genre,
    page = 1,
    limit = 10,
    latest = false, // true => only last month
    top = false,
    mustOffer = false,
  } = queryParams;

  let filter = {};
  let sortCriteria = { createdAt: -1 }; // Default sort by latest creation

   if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
    ];
  }
 
  if (genre) {
    filter.genre = genre;
  }
 
  if (latest === true || latest === "true") {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    filter.createdAt = { $gte: oneMonthAgo };
  }

  if (top === true || top === "true") {
    sortCriteria = { viewRate: -1 };
  }

 
  if (mustOffer === true || mustOffer === "true") {
    filter.discount = { $gt: 0 }; // Books that have an active discount
    
    // Only show  discounts that haven't expired yet
    const now = new Date();
    filter.discountEndDate = { $gte: now };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

 
  const [books, total] = await Promise.all([
    bookModel
      .find(filter)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limitNum)
      .lean(),
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