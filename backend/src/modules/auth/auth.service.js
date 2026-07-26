const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRES_IN || "30d" },
  );
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  user.password = undefined;

  return {
    token: signToken(user),
    user,
  };
};

const getUserFromToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return null;

  return currentUser;
};

module.exports = {
  loginService,
  getUserFromToken,
};
