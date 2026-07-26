const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const User = require("../src/models/User");
 

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ role: "superadmin" });

    if (existing) {
      console.log("sueradmin already exist!");
      return process.exit(1);
    }
    await User.create({
      username: "super@admin",
      email: "super@admin.gmail.com",
      password: "SuperAdminSecret12345",
      role: "superadmin",
    });
    console.log("superadmin created successfully!");
    process.exit(1);
  })

  .catch((err) => {
    console.error(`MONGO DB connection error: ${err.message}`);
    process.exit(1);
  });
