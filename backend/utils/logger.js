
const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "../logs/query.log") }),
    new winston.transports.Console(),
  ],
});

function detectSQLInjection(query) {
  const riskyPatterns = ["--", ";", "DROP", "DELETE", "INSERT", "UPDATE", "xp_cmdshell"];
  return riskyPatterns.some(pattern => query.toUpperCase().includes(pattern));
}

module.exports = { logger, detectSQLInjection };
