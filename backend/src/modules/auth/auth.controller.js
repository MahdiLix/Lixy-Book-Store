const appError = require("../../middlewares/error.js");
const { loginService } = require("./auth.service");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return next(appError(400, "Provide email and password correctly."));
    }

    const authResult = await loginService({
      email,
      password,
    });

    if (!authResult) {
      return next(appError(401, "Invalid credentials."));
    }

    if (authResult === "forbidden") {
      return next(appError(403, "You are not allowed to login here."));
    }

    return res.status(200).json({
      success: true,
      token: authResult.token,
      data: authResult.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
