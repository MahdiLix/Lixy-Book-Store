const mongoose = require('mongoose')

async function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MONGO DB connected successfully!"))
    .catch((err) => {
      console.error(`MONGO DB connection error: ${err.message}`);
      process.exit(1);
    });
}

module.exports = connectDb;