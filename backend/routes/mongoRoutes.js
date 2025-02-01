const express = require("express");
const { connectMongoDB } = require("../utils/mongodbConnector");

const router = express.Router();

/**
 * Recupera tutti i documenti da una collezione MongoDB
 * @param {string} collection Nome della collezione
 */
router.get("/:collection", async (req, res) => {
  try {
    const db = await connectMongoDB();
    const collection = db.collection(req.params.collection);
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error("❌ Errore nel recupero dati MongoDB:", error);
    res.status(500).json({ error: "Errore nel recupero dati" });
  }
});

/**
 * Esegue una pipeline di aggregazione su MongoDB
 * @param {string} collection Nome della collezione
 * @param {Array} pipeline Pipeline di aggregazione
 */
router.post("/:collection/aggregate", async (req, res) => {
  try {
    const db = await connectMongoDB();
    const collection = db.collection(req.params.collection);
    const pipeline = req.body.pipeline;

    if (!Array.isArray(pipeline)) {
      return res.status(400).json({ error: "Pipeline di aggregazione non valida" });
    }

    const result = await collection.aggregate(pipeline).toArray();
    res.json(result);
  } catch (error) {
    console.error("❌ Errore nell'aggregazione MongoDB:", error);
    res.status(500).json({ error: "Errore nell'aggregazione" });
  }
});

module.exports = router;
