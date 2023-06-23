const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.routes");
const errorHandler = require("./middleware/error_handling_middleware");
const cookieParser = require("cookie-parser");
const logger = require("./services/logger");
const { expressWinstonLoger, expressWinstonError } = require("./middleware/loggerMiddleware");
const exHbs = require("express-handlebars")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// const expressWinston = require("express-winston");
// const winston = require("winston");


// console.log(process.env.NODE_ENV)
// console.log(process.env.secret)
// console.log(config.get("secret"))
// console.log(config.get("access_key"))

// logger.log("info", "LOG ma'lumotlar");
// logger.error("ERROR ma'lumotlar");
// logger.debug("DEBUG ma'lumotlar");
// logger.warn("WARN malumotlar");
// logger.info("INFO malumotlar");
// console.trace("TRACE malumotlar");
// console.table([
//   ["Salim", "20"],
//   ["Nodir", "14"],
//   ["Karim", "17"]
// ]);

const PORT = config.get("port") || 3030;

// process.on("uncaughtException", (ex) => {
//   console.log("uncaughExeption:", ex.message);
// });

// process.on("unhandledRejection", (rej) => {
//   console.log("unhandledRejection", rej);
// });

const app = express();
app.use(express.json());
app.use(cookieParser()); // Frontenddan kelayotgan so'rovlar ichidagi cookie o'qidi

// app.use(expressWinstonLoger);

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs"
})

app.engine("hbs", hbs.engine)

app.set("View engine", "hbs")
app.set("views", "views")
app.use(express.static("views"))

app.use(mainRouter);


// app.use(expressWinstonError);

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
