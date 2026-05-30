const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../../models/userModel");

const protect = async (req, res, next) => {
  try {
     const token =
      req.headers.authorization.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1];

     if (!token) {
      return res.status(401).json({
        message: "You are not logged in!",
      });
    }

    const decodeUser = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await userModel.findById(decodeUser.id); //find 6a084fa00291285802ad12d8

    if (!currentUser) {
      return res.status(401).json({
        message: "this user is not exists!",
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You dont't have permission for this action!" });
    }
    next();
  };
};

module.exports = { protect, authorize };
