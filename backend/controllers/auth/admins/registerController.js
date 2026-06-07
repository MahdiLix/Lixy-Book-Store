const userModel = require("../../../models/userModel");

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username.trim() || !email || !password) {
      res.status(400).json({
        messsage: "username, email, password is required!",
      });
    }
    // superadmin can only add admin role
    req.body.role = 'admin';

    const newUser = await userModel.create({ username, email, password });

    res.status(201).json({
      success: true,
      message: "Admin created successfully!",
      data: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "username or email already exists!" });
    }
    // pass to next error middleware
    next(error);
  }
};

module.exports = register;
