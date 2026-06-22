const createError = require("../../middlewares/errors/errorHandling");
const registerNewService = require("../../services/admins/registerNewAdminService");

const registerNewAdmin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email || !password) {
      return next(createError(400, "username, email, password is required!"));
    }
    const newUser = await registerNewService(req.body);

    res.status(201).json({
      success: true,
      message: "Admin created successfully!",
      data: newUser,
    });
    
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, `${messages.join(', ')}`))
    }

    if (error.code === 11000) {
      return next(createError(409, "username or email already exists!"));
    }

    next(error);
  }
};

module.exports = registerNewAdmin;
