const userModel = require('../../models/userModel')

const putAdminByIdService = async (id, userData) => {
  // const user_1 = await userModel.findById(id).select("+password");
  // console.log('password before update', user_1)

  const update = await userModel.findByIdAndUpdate(
    id,
    userData, {
    runValidators: true,
    returnDocument: 'after'
  });

  // const user_2 = await userModel.findById(id).select("+password");
  // console.log('password after update', user_2)

  return update
}
module.exports = putAdminByIdService;
