const path = require("path");
const express = require("express");
const cors = require("cors");
const bookRouter = require("./modules/books/book.routes");
const userRouter = require("./modules/users/user.routes");
const adminRouter = require("./modules/admins/admin.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request loger
app.use((req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`${timeStamp} - INFO relay ${req.method} ${req.originalUrl}`);
  next();
});

// BACKEND SIDE
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // -> for serve photos
app.use("/api/books", bookRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// ERROR CORE
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const errorMessage = err.message || "INTERNAL SERVER ERROR";

  console.error(err);

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    statusCode,
  });
});

module.exports = app;
