const multer = require("multer");
const path = require("path");

const tempdDir = path.join(process.cwd(), "temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempdDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10485,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
