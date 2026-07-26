const getAllUsersService = require("../services/getAllUsers");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllUsersController;
