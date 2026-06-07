const express = require('express');
const login = require('../controllers/auth/users/loginController');
const register = require('../controllers/auth/admins/registerController');
const { protect, authorize } = require('../controllers/auth/users/protectController');
const deleteAdminById = require('../controllers/auth/admins/deleteAdminController');
const adminRouter = express.Router()



// ONLY SUPER ADMIN CAN ADD NEW ADMIN AS ROLE ADMIN
adminRouter.post("/register", protect, authorize("superadmin"), register);

adminRouter.post("/login", login);
adminRouter.delete('/delete/:id', protect, authorize('superadmin'), deleteAdminById);

module.exports = adminRouter;

