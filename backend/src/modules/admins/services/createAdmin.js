const User = require("../../../models/User");

const createAdminService = async ({ username, email, password }) => {
  const admin = new User({
    username,
    email,
    password,
    role: "admin",
  });

  return await admin.save();
};

module.exports = createAdminService;
