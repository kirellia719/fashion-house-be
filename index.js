const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CONFIG
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

// ROUTES
const UploadRouter = require("./routes/UploadRouter");
const FashionRouter = require("./routes/FashionRouter");
app.use("/upload", UploadRouter);
app.use("/fashion", FashionRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    const PORT = process.env.PORT || 8080;
    console.log("Connect to MongoDB");
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
