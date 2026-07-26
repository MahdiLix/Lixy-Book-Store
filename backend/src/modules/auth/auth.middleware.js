const  appError = require("../../middlewares/error.js");
const { getUserFromToken } = require("./auth.service");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next( appError(401, "Authentication required."));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next( appError(401, "Authentication required."));
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return next(
         appError(401, "The user belonging to this token no longer exists."),
      );
    }

    req.user = user;
    next();
  } catch (error) {
    next( appError(401, "Invalid or expired token."));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next( appError(401, "Unauthorized."));
    }

    if (!roles.includes(req.user.role)) {
      return next(
         appError(403, "You don't have permission for this action."),
      );
    }

    next();
  };
};

module.exports = { protect, authorize };
