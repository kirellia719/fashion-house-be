const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleWare = async (req, res, next) => {
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "fashion",
    });
    return res;
  }
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    req.file = cldRes;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

module.exports = { upload, uploadMiddleWare };
