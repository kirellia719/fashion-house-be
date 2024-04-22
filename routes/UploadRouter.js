const router = require("express").Router();
const { upload, uploadMiddleWare } = require("../cloudinary.config");

router.post("/", upload.single("file"), uploadMiddleWare, async (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

module.exports = router;
