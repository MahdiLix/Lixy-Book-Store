const createError = require("../../middlewares/errors/errorHandling");
const decodeUserService = require("../../services/users/userProtectService");

const userProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        createError(
          401,
          "Authentication required. Please provide a valid token.",
        ),
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(
        createError(
          401,
          "Authentication required. Please provide a valid token.",
        ),
      );
    }

    const user = await decodeUserService(token);
 

    if (!user) {
      return next(
        createError(401, "The user belonging to this token no longer exists."),
      );
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(createError(401, "Invalid or expired token."));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, "Unauthorized"));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        createError(403, "You don't have permission for this action!"),
      );
    }

    return next();
  };
};

module.exports = { userProtect, authorize };
