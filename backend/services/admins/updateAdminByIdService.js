const userModel = require("../../models/userModel");

const updateAdminByIdService = async (id, { username, email }) => {
  const update = await userModel.findByIdAndUpdate(
    id,
    {
      username,
      email,
    },
    {
      runValidators: true,
      returnDocument: "after",
    },
  );

  return update;
};
module.exports = updateAdminByIdService;
