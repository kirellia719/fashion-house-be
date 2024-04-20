const router = require("express").Router();
const Fashion = require("../models/FashionModel");
const History = require("../models/HistoryModel");

router.post("/", async (req, res) => {
  try {
    let { date_start, date_end } = req.body;

    const historiesArr = await History.find({
      date: { $gte: date_start, $lte: date_end },
    });

    const clothesArr = Array.from(
      new Set(historiesArr.reduce((a, b) => [...a, ...b.clothes], []))
    );

    let clothes = await Promise.all(clothesArr.map((c) => Fashion.findById(c)));

    clothes = clothes.map((c) => {
      const histories = historiesArr.reduce((a, b) => {
        if (b.clothes.includes(c._id)) return [...a, b.date];
        else return [...a];
      }, []);
      histories.sort((a, b) => new Date(b) - new Date(a));
      return { ...c._doc, histories };
    });
    res.json(clothes);
  } catch (error) {
    return [];
  }
});

module.exports = router;
