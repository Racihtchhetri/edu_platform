const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },

  filename: function (req, file, cb) {
    const unique =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, unique);
  }

});

module.exports = multer({ storage });