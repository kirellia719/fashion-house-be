const router = require("express").Router();
const Fashion = require("../models/FashionModel");
const History = require("../models/HistoryModel");

const getAllHistories = async () => {
  try {
    const histories = await History.find().sort({ date: "desc" });
    const newHistories = await Promise.all(
      histories.map(async (h) => {
        const clothes = await Promise.all(
          h.clothes.map((c) => Fashion.findById(c))
        );
        return { ...h._doc, clothes };
      })
    );
    return newHistories;
  } catch (error) {
    return [];
  }
};

router.get("/", async (req, res) => {
  try {
    const histories = await getAllHistories();
    res.json(histories);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, clothes } = req.body;
    const history = await History.findOne({ date });
    if (history) {
      res.status(401).json("Đã tồn tại");
    } else {
      await History.create({ date, clothes });
      const histories = await getAllHistories();
      res.json(histories);
    }
  } catch (error) {
    res.status(500).json("Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { clothes } = req.body;
    const { id } = req.params;
    const history = await History.findById(id);
    history.clothes = clothes;
    const data = await history.save();
    data.clothes = await Promise.all(
      data.clothes.map((c) => Fashion.findById(c))
    );
    res.json(data);
  } catch (error) {
    res.status(500).json("Error");
  }
});

module.exports = router;
