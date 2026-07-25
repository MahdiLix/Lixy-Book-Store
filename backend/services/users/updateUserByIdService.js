const userModel = require("../../models/userModel");

const updateUserByIdService = async (id, updatedData) => {
  return await userModel
    .findByIdAndUpdate(id, updatedData, {
      runValidators: true,
      returnDocument: "after",
    })
    .select("-password");
};

module.exports = updateUserByIdService;
