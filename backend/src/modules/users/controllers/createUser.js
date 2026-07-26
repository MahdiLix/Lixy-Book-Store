const appError = require("../../../middlewares/error");
const createUserService = require("../services/createUser");

const createUserController = async (req, res, next) => {
  try {
    //  Removed 'role' from destructuring to prevent privilege escalation
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password) {
      return next(appError(400, "username, email, password is required!"));
    }

    const newUser = await createUserService({
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
      return next(appError(400, `${messages.join(", ")}`));
    }

    if (error.code === 11000) {
      return next(appError(409, "username or email already exists!"));
    }

    next(error);
  }
};

module.exports = createUserController;
