const appError = require("../../../middlewares/error.js");
const createAdminService = require("../services/createAdmin.js");

const createAdminController = async (req, res, next) => {
  try {
    // 1. Removed 'role' from destructuring for security
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password) {
      return next(appError(400, "username, email, password is required!"));
    }

    const newUser = await createAdminService({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully!",
      data: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(appError(400, `${messages.join(", ")}`));
    }

    if (error.code === 11000) {
      return next(appError(409, "username or email already exists!"));
    }

    next(error);
  }
};

module.exports = createAdminController;
