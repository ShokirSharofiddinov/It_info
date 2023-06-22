const config = require("config");
const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, prettyPrint, json, colorize } = format;
require("winston-mongodb");
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

let logger;

if (process.env.NODE_ENV === "production") {
  logger = winston.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.File({ filename: "log/error.log", level: "error" }),
      new transports.MongoDB({
        db: config.get("dbUri"),
        options: { useUnifiedTopology: true },
      }),
    ],
  });
} else if (process.env.NODE_ENV === "development") {
  logger = winston.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console({ level: "debug" }),
      new transports.File({ filename: "log/error.log", level: "error" }),
      new transports.File({ filename: "log/combine.log", level: "info" }),
    ],
  });
}

logger.exceptions.handle(new transports.File({ filename: "log/exeption.log" }));

logger.rejections.handle(
  new transports.File({ filename: "log/rejections.log" })
);

logger.exitOnError = false;

module.exports = logger;
