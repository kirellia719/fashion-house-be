const router = require("express").Router();
const { uploadCloud } = require("../cloudinary.config");

router.post("/", uploadCloud, async (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

module.exports = router;
