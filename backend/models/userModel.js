const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required!"],
      maxlength: [100, "username cannot longer than 100 character"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required!"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "password is required!"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (condidatePassword) {
  return bcrypt.compare(condidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
