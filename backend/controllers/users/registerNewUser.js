const createError = require("../../middlewares/errors/errorHandling");
const registerNewUserService = require("../../services/users/registerNewUserService");

const registerNewUser = async (req, res, next) => {
  try {
    // 1. Removed 'role' from destructuring to prevent privilege escalation
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password) {
      return next(createError(400, "username, email, password is required!"));
    }

    const newUser = await registerNewUserService({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(createError(400, `${messages.join(", ")}`));
    }

    if (error.code === 11000) {
      return next(createError(409, "username or email already exists!"));
    }

    next(error);
  }
};

module.exports = registerNewUser;
