const userModel = require("../../models/userModel");

const updateAdminByIdService = async (id, updateData) => {
  const update = await userModel
    .findByIdAndUpdate(id, updateData, {
      runValidators: true,
      returnDocument: "after",
    })
    .select("-password");

  return update;
};
module.exports = updateAdminByIdService;
