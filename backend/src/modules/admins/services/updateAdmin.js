const User = require("../../../models/User");

const updateAdmindService = async (id, updateData) => {
  const update = await User.findByIdAndUpdate(id, updateData, {
    runValidators: true,
    returnDocument: "after",
  }).select("-password");

  return update;
};
module.exports = updateAdmindService;
