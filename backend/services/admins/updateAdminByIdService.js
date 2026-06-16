const userModel = require("../../models/userModel");

const updateAdminByIdService = async (id, userData) => {
 
  const data = { ...userData };

  if (data.password) {
    delete data.password;
  }
 
  const update = await userModel.findByIdAndUpdate(id, data, {
    runValidators: true,
    returnDocument: "after",
  });
 
  return update;
};
module.exports = updateAdminByIdService;
