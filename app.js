const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.routes");
const errorHandler = require("./middleware/error_handling_middleware");
const cookieParser = require("cookie-parser");

const PORT = config.get("port") || 3030;

const app = express();
app.use(express.json());
app.use(cookieParser()); // Frontenddan kelayotgan so'rovlar ichidagi cookie o'qidi

app.use(mainRouter);

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Could not connect to database");
  }
}

start();
