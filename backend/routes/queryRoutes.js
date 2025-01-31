
const express = require("express");
const connectDB = require("../utils/dbConnector");
const { logger, detectSQLInjection } = require("../utils/logger");

const router = express.Router();

router.post("/", async (req, res) => {
  const { query, params } = req.body;

  if (!query) {
    return res.status(400).json({ error: "La query non può essere vuota." });
  }

  if (detectSQLInjection(query)) {
    logger.warn(`🚨 SQL Injection rilevata: ${query}`);
    return res.status(403).json({ error: "Query non consentita per motivi di sicurezza." });
  }

  try {
    const db = await connectDB();
    const dbType = process.env.DB_TYPE;

    let result;
    if (dbType === "postgresql") {
      result = await db.query(query, params || []);
    } else if (dbType === "mysql") {
      result = await db.execute(query, params || []);
    } else {
      return res.status(400).json({ error: "Database non supportato." });
    }

    logger.info({ message: "Query eseguita", query, params, dbType });
    res.json(result.rows || result[0]);
  } catch (error) {
    logger.error(`Errore query: ${query}`, { error: error.message });
    res.status(500).json({ error: "Errore nell'esecuzione della query." });
  }
});

module.exports = router;
