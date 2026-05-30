const userModel = require("../../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

const authToken = (userId) => {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN || "30d",
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email.trim() || !password) {
      return res.status(400).json({
        message: "provide email and password correctly",
      });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const matchPass = await user.comparePassword(password);
    if (!matchPass) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    // remove pass for security
    user.password = undefined;
    // now add cookies to save login token in browser
   
    res.status(200).json({
      success: true,
      token: authToken(user._id), //db _id: 6a084fa00291285802ad12d8
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;
