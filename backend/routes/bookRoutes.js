const express = require('express')
const bookRouter = express.Router()

const getBookByQuery = require("../controllers/crud/getBookController");
const getBookById = require('../controllers/crud/getBookByIdController');

const postNewBook = require('../controllers/crud/postNewBookController');
const putBookById = require('../controllers/crud/putBookController');
const deleteBookById = require('../controllers/crud/deleteBookController');

const { protect, authorize } = require('../controllers/auth/users/protectController');



bookRouter.get("/", getBookByQuery);
bookRouter.get("/:id", getBookById);

// ADMIN CAN ONLY POST, DELETE, UPDATE BOOKS
bookRouter.post("/add", protect, authorize("admin", "superadmin"), postNewBook);
  
bookRouter.put("/update/:id", protect, authorize("admin", "superadmin"), putBookById);

bookRouter.delete("/delete/:id", protect, authorize("superadmin"), deleteBookById);
module.exports = bookRouter;