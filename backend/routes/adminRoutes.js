const express = require('express');
const adminRouter = express.Router();
const { userProtect, authorize } = require('../controllers/users/userProtect');
const registerNewAdmin = require('../controllers/admins/registerNewAdmin');
const deleteAdminById = require('../controllers/admins/deleteAdminById');
const userLogin = require('../controllers/users/userLogin');




// ONLY SUPER ADMIN CAN ADD NEW ADMIN AS ROLE ADMIN
adminRouter.post("/register", userProtect, authorize("superadmin"), registerNewAdmin);

adminRouter.post("/login", userLogin);
adminRouter.delete('/delete/:id', userProtect, authorize('superadmin'), deleteAdminById);

module.exports = adminRouter;

