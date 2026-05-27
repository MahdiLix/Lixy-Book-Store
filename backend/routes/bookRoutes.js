const express = require('express')
const bookRouter = express.Router()
const getBookByQuery = require("../controllers/crud/getBookController");

const postNewBook = require('../controllers/crud/postNewBookController');
const putBookById = require('../controllers/crud/putBookController');
const deleteBookById = require('../controllers/crud/deleteBookController');

const { protect, authorize } = require('../controllers/auth/protectController');


bookRouter.get("/", getBookByQuery)

// ADMIN CAN ONLY POST, DELETE, UPDATE BOOKS
bookRouter.post("/", protect, authorize("admin", "superadmin"), postNewBook)
// bookRouter.post("/", postNewBook)


bookRouter.put("/update/:id", protect, authorize("admin", "superadmin"), putBookById)

bookRouter.delete("/delete/:id", protect, authorize("admin", "superadmin"), deleteBookById)
module.exports = bookRouter;