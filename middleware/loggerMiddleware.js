const config = require("config");
const { format, transports } = require("winston");
const { combine, timestamp, prettyPrint, metadata } = format;
require("winston-mongodb");
const expressWinston = require("express-winston");

const expressWinstonLoger = expressWinston.logger({
  transports: [
    new transports.MongoDB({
      db: config.get("dbUri"),
      options: { useUnifiedTopology: true },
    }),
    new transports.Console(),
  ],
  format: combine(timestamp(), prettyPrint(), metadata()),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) {
    return false;
  },
});

const expressWinstonError = expressWinston.errorLogger({
  transports: [new transports.Console()],
  format: combine(prettyPrint()),
});

module.exports = {
  expressWinstonLoger,
  expressWinstonError,
};
