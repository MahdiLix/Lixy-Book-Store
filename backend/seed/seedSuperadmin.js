require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await userModel.findOne({ role: "superadmin" });

    if (existing) {
      console.log("sueradmin already exist!");
      return process.exit(1);
    }
    await userModel.create({
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

