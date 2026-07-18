const createError = require("../../middlewares/errors/errorHandling");
const loginService = require("../../services/users/userLoginService");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return next(createError(400, "provide email and password correctly"));
    }

    // Pass only the specific object for safety
    const userAuth = await loginService({ email, password });

    res.status(200).json({
      success: true,
      token: userAuth,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userLogin;
