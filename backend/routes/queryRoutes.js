const express = require("express");
const { getDBConnector } = require("../utils/dbConnector"); // Importa getDBConnector
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
    const db = await getDBConnector(); // Usa getDBConnector
    const dbType = process.env.DB_TYPE;

    let result;
    if (db instanceof Pool) { // Se è una connessione SQL
      result = await db.query(query, params ||); // Usa prepared statements
    } else { // Se è una connessione MongoDB
      // Esegui la query MongoDB (esempio)
      result = await db.collection("data").find().toArray(); 
    }

    logger.info({ message: "Query eseguita", query, params, dbType });
    res.json(result.rows || result); // Adatta in base al risultato di MongoDB
  } catch (error) {
    logger.error(`Errore query: ${query}`, { error: error.message });
    res.status(500).json({ error: "Errore nell'esecuzione della query." });
  }
});

module.exports = router;