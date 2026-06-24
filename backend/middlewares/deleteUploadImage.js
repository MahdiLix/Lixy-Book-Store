const fs = require("fs");
const path = require("path");

const UPLOAD_ROOT =
  process.env.UPLOAD_ROOT || path.resolve(process.cwd(), "uploads");

const deleteUploadImage = async (filePath) => {
  if (filePath) {
    const fileName = path.basename(filePath);
    const fullPath = path.join(UPLOAD_ROOT, fileName);

    try {
      await fs.promises.unlink(fullPath);
      console.log(`File Cleanup Successfully: Removed ${fullPath}`);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error(`Cleanup Error: ${error}`);
      }
    }
  }
};

module.exports = deleteUploadImage;
