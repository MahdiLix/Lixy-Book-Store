const userModel = require("../../models/userModel");


const registerNewAdminService = async ({ username, email, password }) => {
  const admin = new userModel({
    username,
    email,
    password,
    role: "admin",
  });

  return await admin.save();
};

module.exports = registerNewAdminService;
