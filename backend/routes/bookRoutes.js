const express = require('express');
const bookRouter = express.Router()

const getBookByQuery = require('../controllers/booksCrud/getBookByQuery');
const getBookById = require('../controllers/booksCrud/getBookById');
const { userProtect, authorize } = require('../controllers/users/userProtect');
const postNewBook = require('../controllers/booksCrud/postNewBook');
const putBookById = require('../controllers/booksCrud/putBookById');
const deleteBookById = require('../controllers/booksCrud/deleteBookById');
 
 
bookRouter.get("/", getBookByQuery);
bookRouter.get("/:id", getBookById);

// ADMIN CAN ONLY POST, DELETE, UPDATE BOOKS
bookRouter.post("/add", userProtect, authorize("admin", "superadmin"), postNewBook);
 
bookRouter.put("/update/:id", userProtect, authorize("admin", "superadmin"), putBookById);

bookRouter.delete("/delete/:id", userProtect, authorize("superadmin"), deleteBookById);
 
module.exports = bookRouter;