const express = require("express");
const { protect, authorize } = require("../auth/auth.middleware");
const bookUpload = require("../../middlewares/uploads/upload");
const getBookByQueryController = require("./controllers/getBookByQuery");
const getBookByIdController = require("./controllers/getBookById");
const createBookController = require("./controllers/createBook");
const updateBookController = require("./controllers/updateBook");
const deleteBookController = require("./controllers/deleteBook");
const bookRouter = express.Router();


bookRouter.get("/", getBookByQueryController);
bookRouter.get("/:id", getBookByIdController);

// ADMIN CAN ONLY POST, DELETE, UPDATE BOOKS
bookRouter.post(
  "/add",
  protect,
  authorize("admin", "superadmin"),
  bookUpload.single("bookImage"),
  createBookController,
);

bookRouter.put(
  "/update/:id",
  protect,
  authorize("admin", "superadmin"),
  bookUpload.single("bookImage"),
  updateBookController,
);

bookRouter.delete(
  "/delete/:id",
  protect,
  authorize("admin", "superadmin"),
  deleteBookController,
);

module.exports = bookRouter;
