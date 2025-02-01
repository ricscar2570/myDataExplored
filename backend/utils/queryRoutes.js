const express = require("express");
const connectDB = require("../utils/dbConnector");
const { logger, detectSQLInjection } = require("../utils/logger");
const { notifyClients } = require("./webhookRoutes");

const router = express.Router();

router.get("/", async (req, res) => {
  const { filter } = req.query;

  try {
    const db = await connectDB();
    let query = "SELECT category, SUM(value) as value FROM data";
    
    if (filter && filter !== "all") {
      query += ` WHERE category = '${filter}'`;
    }

    query += " GROUP BY category";

    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Errore nella query:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});

module.exports = router;
