const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const { uploadCloud } = require("../cloudinary.config");
const Fashion = require("../models/FashionModel");

router.get("/", async (req, res) => {
  try {
    const fashions = await Fashion.find();
    res.json(fashions);
  } catch (error) {
    res.json("Error");
  }
});

router.post("/", uploadCloud, async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file?.url || "",
      owner: "abc",
      publicId: req.file?.public_id,
    };
    const newFashion = await Fashion.create(data);
    res.json(newFashion);
  } catch (error) {
    res.json("Error");
  }
});

router.put("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fashion = await Fashion.findById(id);
    fashion.liked = !fashion.liked;
    res.json(await fashion.save());
  } catch (error) {
    res.json("Error");
  }
});

router.put("/:id", uploadCloud, async (req, res) => {
  try {
    const { id } = req.params;
    const fashion = await Fashion.findById(id);
    for (let key in req.body) {
      fashion[key] = req.body[key];
    }
    if (req.file) {
      fashion.publicId && (await cloudinary.uploader.destroy(fashion.publicId));
      fashion.image = req.file.url;
      fashion.publicId = req.file.public_id;
    }
    res.json(await fashion.save());
  } catch (error) {
    res.json("Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fashion = await Fashion.findById(id);
    fashion.publicId && (await cloudinary.uploader.destroy(fashion.publicId));
    res.json(await fashion.deleteOne());
  } catch (error) {
    res.status(500).json("Error");
  }
});

module.exports = router;
