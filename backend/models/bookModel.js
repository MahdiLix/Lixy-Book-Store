const mongoose = require("mongoose");
const crypto = require("crypto");
const createError = require("../middlewares/errors/errorHandling");

const nowYear = new Date().getFullYear();

const GENRES = [
  "Fiction",
  "Love",
  "Novel",
  "History",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "Poetry",
  "Mystery",
  "Thriller",
  "Children",
  "Religious",
  "Self-help",
  "Other",
];

function generateCandidateIsbn() {
  const MIN = 1_000_000_000_000;
  const MAX = 9_999_999_999_999;
  return String(crypto.randomInt(MIN, MAX + 1));
}

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
      maxlength: [100, "Title cannot be longer than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required!"],
      trim: true,
      maxlength: [200, "Author cannot be longer than 200 characters"],
    },
    isbn: {
      type: String,
      unique: true,
      immutable: true,
      match: [/^[0-9]{10,13}$/, "ISBN must be 10 or 13 digits"],
    },
    publishedYear: {
      type: Number,
      default: nowYear,
      min: [1500, "Year must be at least 1500"],
      max: [nowYear + 3, `Year cannot be greater than ${nowYear + 3}`],
    },
    genre: {
      type: String,
      enum: {
        values: GENRES,
        message: "{VALUE} is not a valid genre!",
      },
      default: "Other",
    },
    isStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 1,
      min: [0, "stock quantity cannot be negative"],
    },
    price: {
      type: Number,
      default: 1,
    },
    discount: {
      type: Number,
      min: [0, "Discount percent cannot be smaller than 0%"],
      max: [100, "Discount percent cannot be greater than 100%"],
      default: 0,
    },
    discountedPrice: {
      type: Number,
    },
    discountEndDate: {
      type: Date,
    },
    bookImage: {
      type: String,
      default: "",
    },
    viewRate: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

// Document Middlewares
bookSchema.pre("validate", function checkIsStock() {
  this.isStock = (this.stockQuantity ?? 0) > 0; // -> true/ false
});

bookSchema.pre("validate", function calculateDiscountPrice() {
  if (this.discount > 0) {
    this.discountedPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.discountedPrice = undefined;
  }
});

bookSchema.pre("validate", async function assignIsbn() {
  if (this.isbn) return;

  const MAX_ATTEMPTS = 5;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const isbnCandidate = generateCandidateIsbn();
    const exists = await this.constructor.exists({ isbn: isbnCandidate });

    if (!exists) {
      this.isbn = isbnCandidate;
      return;
    }
  }
  throw createError(
    500,
    "Failed to generate unique ISBN after multiple attempts",
  );
});

// Query Middlewares
function cleanExpiredDiscounts(docs) {
  if (!docs || docs.length === 0) return;

  const now = new Date();
  const expiredBookIds = [];

  docs.forEach((doc) => {
    if (doc.discount > 0 && doc.discountEndDate && now > doc.discountEndDate) {
      expiredBookIds.push(doc._id);

      // change "immedately" in js object in memory and send to frontend
      doc.discount = 0;
      doc.discountedPrice = undefined;
      doc.discountEndDate = undefined;
    }
  });
  // change MongoDB in the background
  if (expiredBookIds.length > 0) {
    this.model
      .updateMany(
        { _id: { $in: expiredBookIds } },
        {
          $set: { discount: 0 },
          $unset: { discountedPrice: 1, discountEndDate: 1 }, // Delete fields
        },
      )
      .exec() // Run in background, don't make user wait
      .catch((err) => {
        console.error(
          "Failed to clean expired discount in the background",
          err.message,
        );
      });
  }
}

bookSchema.post("find", function (docs, next) {
  if (!docs || docs.length === 0) return next();
  cleanExpiredDiscounts.call(this, docs);
  next();
});

bookSchema.post("findOne", function (doc, next) {
  if (!doc) return next();
  cleanExpiredDiscounts.call(this, [doc]);
  next();
});

// Instance Methods
bookSchema.methods.setDiscount = function (percent, hours = 24) {
  this.discount = percent;
  this.discountEndDate = new Date(Date.now() + hours * 60 * 60 * 1000);
};

bookSchema.methods.removeDiscount = function () {
  this.discount = 0;
  this.discountedPrice = undefined;
  this.discountEndDate = undefined;
};

// Static Methods
bookSchema.statics.incrementView = function (bookId) {
  return this.findByIdAndUpdate(
    bookId,
    { $inc: { viewRate: 1 } }, // first update view, then return to frontend
    { new: true },
  );
};

module.exports = mongoose.model("Book", bookSchema);
