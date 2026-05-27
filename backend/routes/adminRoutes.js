const express = require('express');
const login = require('../controllers/auth/loginController');
const register = require('../controllers/auth/registerController');
const { protect, authorize } = require('../controllers/auth/protectController');
const adminRouter = express.Router()



adminRouter.post("/login", login)
// ONLY SUPER ADMIN CAN ADD NEW ADMIN
adminRouter.post("/register", protect, authorize("superadmin"), register)
module.exports = adminRouter; 

