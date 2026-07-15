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

  // 1. Search by Title and Author only (Separated from genre)
  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // 2. Filter by Genre (Exact match because it's an enum in your model)
  if (genre) {
    filter.genre = genre;
  }

  // 3. Latest filter (Books created within the last month)
  if (latest === true || latest === "true") {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    filter.createdAt = { $gte: oneMonthAgo };
  }

  // 4. Top filter (Sort by viewRate descending)
  if (top === true || top === "true") {
    sortCriteria = { viewRate: -1 };
  }

  // 5. MustOffer filter (FIXED: Targeting the 'discount' field from your model)
  if (mustOffer === true || mustOffer === "true") {
    filter.discount = { $gt: 0 }; // Books that have an active discount
    
    // Optional strict check: If you only want offers that haven't expired yet 
    // based on your discountEndDate field, uncomment the lines below:
    // const now = new Date();
    // filter.discountEndDate = { $gte: now };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  // Performance: .lean() is used to return plain JS objects.
  // Your model's post('find') middleware will still run and clean expired discounts properly.
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