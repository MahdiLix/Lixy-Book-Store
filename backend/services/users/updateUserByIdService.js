const userModel = require("../../models/userModel");

const updateUserByIdService = async (id, { username, email }) => {
  return await userModel
    .findByIdAndUpdate(
      id,
      { username, email },
      { runValidators: true, returnDocument: "after" },
    )
    .select("-password");
};
module.exports = updateUserByIdService;
