const express = require("express");
const Webhook = require("../models/Webhook"); // Importa il modello Webhook
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { url } = req.body;
    const webhook = new Webhook({ url });
    await webhook.save();
    res.json({ message: "Webhook registrato" });
  } catch (error) {
    console.error("Errore nella registrazione del webhook:", error);
    res.status(500).json({ error: "Errore nella registrazione del webhook" });
  }
});

router.post("/notify", async (req, res) => {
  const { event, data } = req.body;
  try {
    const webhooks = await Webhook.find(); // Recupera gli endpoint dal database
    for (let webhook of webhooks) {
      fetch(webhook.url, { method: "POST", body: JSON.stringify({ event, data }) });
    }
    res.json({ message: "Webhook inviato" });
  } catch (error) {
    console.error("Errore nell'invio del webhook:", error);
    res.status(500).json({ error: "Errore nell'invio del webhook" });
  }
});

module.exports = router;