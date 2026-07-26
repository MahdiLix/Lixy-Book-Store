const getAllAdminsService = require("../services/getAllAdmins");

const getAllAdminsController = async (req, res, next) => {
  try {
    const admins = await getAllAdminsService();
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllAdminsController;
