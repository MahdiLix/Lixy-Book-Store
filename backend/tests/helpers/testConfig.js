const path = require("path");

const SUPERADMIN_CREDENTIALS = {
  email: process.env.TEST_SUPERADMIN_EMAIL || "super@admin.gmail.com",
  password: process.env.TEST_SUPERADMIN_PASSWORD || "SuperAdminSecret12345",
};
 
const UPLOAD_ROOT =
  process.env.UPLOAD_ROOT || path.resolve(process.cwd(), "uploads");

  
function uniqueSuffix() {
  return `${Date.now()}_${Math.floor(Math.random() * 10_000)}`;
}

module.exports = {
  SUPERADMIN_CREDENTIALS,
  UPLOAD_ROOT,
  uniqueSuffix,
};
