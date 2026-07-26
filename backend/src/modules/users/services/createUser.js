const User = require("../../../models/User.js");

const createUserService = async ({ username, email, password }) => {
  const newUser = new User({
    username,
    email,
    password,
  });

  return await newUser.save();
};

module.exports = createUserService;
