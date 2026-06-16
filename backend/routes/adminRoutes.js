const express = require('express');
const adminRouter = express.Router();
const { userProtect, authorize } = require('../controllers/users/userProtect');
const registerNewAdmin = require('../controllers/admins/registerNewAdmin');
const deleteAdminById = require('../controllers/admins/deleteAdminById');
const userLogin = require('../controllers/users/userLogin');
const putAdminById = require('../controllers/admins/putAdminById');


adminRouter.post('/login', userLogin);

// ONLY SUPER ADMIN CAN ADD NEW ADMIN AS ROLE ADMIN
adminRouter.post("/register", userProtect, authorize("superadmin"), registerNewAdmin);

adminRouter.put('/update/:id', userProtect, authorize('admin', 'superadmin'), putAdminById)

adminRouter.delete('/delete/:id', userProtect, authorize( 'admin', 'superadmin'), deleteAdminById)

module.exports = adminRouter;

