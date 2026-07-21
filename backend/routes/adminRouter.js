const express = require("express");
const adminRouter = express.Router();
const { userProtect, authorize } = require("../controllers/users/userProtect");
const registerNewAdmin = require("../controllers/admins/registerNewAdmin");
const userLogin = require("../controllers/users/userLogin");
const getAdminById = require("../controllers/admins/getAdminById");
const getAllAdmins = require("../controllers/admins/getAllAdmins"); 
const updateAdminById = require("../controllers/admins/updateAdminById");
const updateAdminPasswordById = require("../controllers/admins/updateAdminPasswordById");
const deleteAdminById = require("../controllers/admins/deleteAdminById");


adminRouter.post("/login", userLogin);

// ONLY SUPER ADMIN CAN ADD NEW ADMIN AS ROLE ADMIN
adminRouter.post(
  "/register",
  userProtect,
  authorize("superadmin"),
  registerNewAdmin,
);

adminRouter.get("/admins", userProtect, authorize("superadmin"), getAllAdmins);

// Only admins/superadmins should view admin profiles
adminRouter.get(
  "/:id",
  userProtect,
  authorize("admin", "superadmin"),
  getAdminById,
);

adminRouter.put(
  "/update/:id",
  userProtect,
  authorize("admin", "superadmin"),
  updateAdminById,
);

adminRouter.patch(
  "/password/:id",
  userProtect,
  authorize("admin", "superadmin"),
  updateAdminPasswordById,
);

adminRouter.delete(
  "/delete/:id",
  userProtect,
  authorize("superadmin"),
  deleteAdminById,
);

module.exports = adminRouter;
