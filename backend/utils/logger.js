const winston = require("winston");
const path = require("path");
const { sendAlertEmail } = require("./emailAlert");

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

// Funzione per rilevare SQL Injection
function detectSQLInjection(query, ip) {
  const riskyPatterns = ["--", ";", "DROP", "DELETE", "INSERT", "UPDATE", "xp_cmdshell"];

  if (riskyPatterns.some(pattern => query.toUpperCase().includes(pattern))) {
    logger.warn(`🚨 Tentativo di SQL Injection rilevato: ${query} (IP: ${ip})`);
    sendAlertEmail(query, ip); // Invia email di avviso
    return true;
  }
  
  return false;
}

module.exports = { logger, detectSQLInjection };
