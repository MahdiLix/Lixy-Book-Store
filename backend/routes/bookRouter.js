const express = require("express");
const bookRouter = express.Router();

const getBookByQuery = require("../controllers/booksCrud/getBookByQuery");
const getBookById = require("../controllers/booksCrud/getBookById");
const { userProtect, authorize } = require("../controllers/users/userProtect");
const postNewBook = require("../controllers/booksCrud/postNewBook");
const updateBookById = require("../controllers/booksCrud/updateBookById");
const deleteBookById = require("../controllers/booksCrud/deleteBookById");
const bookUpload = require("../middlewares/bookUpload");

bookRouter.get("/", getBookByQuery);
bookRouter.get("/:id", getBookById);

// ADMIN CAN ONLY POST, DELETE, UPDATE BOOKS
bookRouter.post(
  "/add",
  userProtect,
  authorize("admin", "superadmin"),
  bookUpload.single("bookImage"),
  postNewBook,
);

bookRouter.put(
  "/update/:id",
  userProtect,
  authorize("admin", "superadmin"),
  bookUpload.single("bookImage"),
  updateBookById,
);

bookRouter.delete(
  "/delete/:id",
  userProtect,
  authorize("admin", "superadmin"),
  deleteBookById,
);

module.exports = bookRouter;
