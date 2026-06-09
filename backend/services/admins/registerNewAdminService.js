const userModel = require("../../models/userModel");

const registerNewAdminService = async (adminData) => {
  const { username, email, password } = adminData;
 
  return await userModel.create({username, email, password})

}

module.exports = registerNewAdminService;