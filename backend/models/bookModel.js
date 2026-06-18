const mongoose = require("mongoose");

const nowYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
      maxlength: [100, "Title cannot loger that 100 character"],
    },
    author: {
      type: String,
      required: [true, "Author is required!"],
      trim: true,
      maxlength: [200, "Author cannot longer that 200 character"],
    },
    isbn: {
      type: String,
      unique: true,
      default: function () {
        return Math.floor(1_000_000_000 + Math.random() * 9_000_000_000_000);
      },
      immutable: true,
      match: [/^[0-9]+$/, "ISBN only contain digits"],
    },
    publishedYear: {
      type: Number,
      default: nowYear,
      min: [1500, "Year must be at leaste 1500"],
      max: [nowYear + 3, `year cannot be greater than: ${nowYear + 3}`],
    },
    genre: {
      type: String,
      enum: {
        values: [
          "Fiction",
          "Non-Fiction",
          "Science",
          "Computer",
          "History",
          "Fantasy",
          "Biography",
          "Other",
        ],
        message: "{ VALUE } is not a vallied genre!",
      },
      default: "Other",
    },
    availableCopies: {
      type: Number,
      default: 1,
      min: [0, "Available copies cannot be Negative"],
    },
    bookImage: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
