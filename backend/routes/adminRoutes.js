const express = require('express');
const adminRouter = express.Router();
const { userProtect, authorize } = require('../controllers/users/userProtect');
const registerNewAdmin = require('../controllers/admins/registerNewAdmin');
const userLogin = require('../controllers/users/userLogin');
const updateAdminById = require('../controllers/admins/updateAdminById');
const updateAdminPassById = require('../controllers/admins/updateAdminPassById');
const deleteAdminById = require('../controllers/admins/deleteAdminById');

adminRouter.post('/login', userLogin);

// ONLY SUPER ADMIN CAN ADD NEW ADMIN AS ROLE ADMIN
adminRouter.post("/register", userProtect, authorize("superadmin"), registerNewAdmin);

adminRouter.put('/update/:id', userProtect, authorize('admin', 'superadmin'), updateAdminById);

adminRouter.patch('/password/:id', userProtect, authorize('admin', 'superadmin'), updateAdminPassById);

adminRouter.delete('/delete/:id', userProtect, authorize('superadmin'), deleteAdminById);

module.exports = adminRouter;

``