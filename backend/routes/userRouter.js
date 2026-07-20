const express = require("express");
const userRouter = express.Router();
const registerNewUser = require("../controllers/users/registerNewUser");
const userLogin = require("../controllers/users/userLogin");
const getUserById = require("../controllers/users/getUserById");
const { userProtect, authorize } = require("../controllers/users/userProtect");
const getAllUsers = require("../controllers/users/getAllUsers");
const updateUserById = require("../controllers/users/updateUserById");
const updateUserPassword = require("../controllers/users/updateUserPassword");
const deleteUserById = require("../controllers/users/deleteUserById");

 
userRouter.post("/register", registerNewUser);
userRouter.post("/login", userLogin);

userRouter.get(
  "/users",
  userProtect,
  authorize("admin", "superadmin"),
  getAllUsers,
);

userRouter.get("/:id", userProtect, getUserById);

userRouter.put("/update/:id", userProtect, updateUserById);

userRouter.patch("/password/:id", userProtect, updateUserPassword);

userRouter.delete("/delete/:id", userProtect, deleteUserById);
module.exports = userRouter;
