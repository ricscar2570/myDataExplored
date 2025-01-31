const express = require("express");
const router = express.Router();
let subscribedEndpoints = [];

router.post("/register", (req, res) => {
    const { url } = req.body;
    subscribedEndpoints.push(url);
    res.json({ message: "Webhook registrato" });
});

router.post("/notify", async (req, res) => {
    const { event, data } = req.body;
    for (let endpoint of subscribedEndpoints) {
        fetch(endpoint, { method: "POST", body: JSON.stringify({ event, data }) });
    }
    res.json({ message: "Webhook inviato" });
});

module.exports = router;