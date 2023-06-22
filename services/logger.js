const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, prettyPrint,json } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(timestamp(), myFormat, json(), prettyPrint()),
  transports: [new winston.transports.Console({ level: "debug" })],
});

module.exports = logger;