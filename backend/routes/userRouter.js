const express = require("express");
const userRouter = express.Router();
const registerNewUser = require("../controllers/users/registerNewUser");
const userLogin = require("../controllers/users/userLogin");



userRouter.post("/register", registerNewUser);

userRouter.post("/login", userLogin);

module.exports = userRouter;
