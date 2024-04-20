const router = require("express").Router();
const uploadCloud = require("../cloudinary.config");

router.post("/", uploadCloud.single("file"), async (req, res) => {
  console.log(req.file);
  res.json(req.file?.path);
});

module.exports = router;
