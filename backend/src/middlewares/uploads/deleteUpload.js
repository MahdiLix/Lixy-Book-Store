const fs = require("fs");
const path = require("path");

// check UPLOAD_ROOT loaded in docker-yml
// if  docker is not loaded, use host path
const UPLOAD_ROOT =
  process.env.UPLOAD_ROOT || path.resolve(__dirname, "../../uploads");

const deleteUpload = async (filePath) => {
  console.log("root-uploads", UPLOAD_ROOT);
  console.log("file-path", filePath);

  if (!filePath) return;

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
};

module.exports = deleteUpload;
