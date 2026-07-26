const path = require("path");
const dotenv = require("dotenv");

const app = require("./app");
const connectDb = require("./config/database");
// use env in entry point
dotenv.config();

async function startServer() {
  await connectDb();

  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || "0.0.0.0";
  app.listen(PORT, HOST, () => {
    console.log(`Server runninng on http://${HOST}:${PORT}`);
  });
}
startServer();
