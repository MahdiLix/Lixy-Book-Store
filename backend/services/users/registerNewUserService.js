const userModel = require("../../models/userModel");

const registerNewUserService = async ({ username, email, password }) => {
  const newUser = new userModel({
    username,
    email,
    password,
  });

  return await newUser.save();
};

module.exports = registerNewUserService;
