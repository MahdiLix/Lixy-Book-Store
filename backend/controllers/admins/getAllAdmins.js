const getAllAdminsService = require("../../services/admins/getAllAdminsService");
 
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await getAllAdminsService();
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllAdmins;
