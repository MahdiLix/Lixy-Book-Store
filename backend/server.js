const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const dotenv = require("dotenv");
const adminRouter = require("./routes/adminRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// request loger
app.use((req, res, next) => {
  const timeStamp = new Date().toISOString()
  console.log(`${timeStamp} - INFO relay ${req.method} ${req.originalUrl}`);
  next();
});

// FRONTEND SIDE
 
// app.get("/books", (req, res, next) => {
//   res.status(200).sendFile(path.join(__dirname, "public", "template", "index.html"))
// })
// app.get("/login", (req, res, next) => {
//   res.status(200).sendFile(path.join(__dirname, 'public', 'template', 'admin.html'))
// })
// app.get("/admin/editbook/:id", (req, res, next) => {
//   res.status(200).sendFile(path.join(__dirname, "public", 'template', 'editBook.html'))
// })

// BACKEND SIDE
app.use("/api/books", bookRoutes);
app.use("/api/user", adminRouter);


app.use(async (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "INTERNAL SERVER ERROR";

  console.error(`${errorMessage}: ${err}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGO DB connected successfully!"))
  .catch((err) => {
    console.error(`MONGO DB connection error: ${err.message}`);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server runninng on http://${HOST}:${PORT}`);
  console.log("Server endpoint: /api/book");
});
