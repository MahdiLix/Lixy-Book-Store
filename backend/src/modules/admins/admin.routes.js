const express = require("express");
const adminRouter = express.Router();
const { protect, authorize } = require("../auth/auth.middleware");
const { login } = require("../auth/auth.controller");
const createAdminController = require("./controllers/createAdmin");
const getAllAdminsController = require("./controllers/getAllAdmins");
const getAdminByIdController = require("./controllers/getAdminById");
const updateAdminController = require("./controllers/updateAdmin");
const changeAdminPasswordController = require("./controllers/changeAdminPassword");
const deleteAdminController = require("./controllers/deleteAdmin");


adminRouter.post("/login", login);

// ONLY SUPER ADMIN CAN ADD NEW ADMIN AS ROLE ADMIN
adminRouter.post(
  "/register",
  protect,
  authorize("superadmin"),
  createAdminController,
);

adminRouter.get("/admins", protect, authorize("superadmin"), getAllAdminsController);

// Only admins/superadmins should view admin profiles
adminRouter.get(
  "/:id",
  protect,
  authorize("admin", "superadmin"),
  getAdminByIdController,
);

adminRouter.put(
  "/update/:id",
  protect,
  authorize("admin", "superadmin"),
  updateAdminController,
);

adminRouter.patch(
  "/password/:id",
  protect,
  authorize("admin", "superadmin"),
  changeAdminPasswordController,
);

adminRouter.delete(
  "/delete/:id",
  protect,
  authorize("superadmin"),
  deleteAdminController,
);

module.exports = adminRouter;
