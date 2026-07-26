const User = require("../../../models/User");

const updateUserService = async (id, updatedData) => {
  return await User
    .findByIdAndUpdate(id, updatedData, {
      runValidators: true,
      returnDocument: "after",
    })
    .select("-password");
};

module.exports = updateUserService;
