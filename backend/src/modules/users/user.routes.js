const express = require("express");
const userRouter = express.Router();
const { protect, authorize } = require("../auth/auth.middleware");
const { login } = require("../auth/auth.controller");
const getAllUsersController = require("./controllers/getAllUsers");
const getUserByIdController = require("./controllers/getUserById");
const updateUserController = require("./controllers/updateUser");
const changeUserPasswordController = require("./controllers/changeUserPassword");
const deleteUserController = require("./controllers/deleteUser");
const createUserController = require("./controllers/createUser");

userRouter.post("/register", createUserController);
userRouter.post("/login", login);

userRouter.get(
  "/users",
  protect,
  authorize("admin", "superadmin"),
  getAllUsersController,
);

userRouter.get("/:id", protect, getUserByIdController);

userRouter.put("/update/:id", protect, updateUserController);

userRouter.patch("/password/:id", protect, changeUserPasswordController);

userRouter.delete("/delete/:id", protect, deleteUserController);
module.exports = userRouter;
