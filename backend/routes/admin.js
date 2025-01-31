const express = require("express");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/users", authenticate, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "username email role sector");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/users/:id", authenticate, isAdmin, async (req, res) => {
    try {
        const { role, sector } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role, sector }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/users/:id", authenticate, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Utente rimosso con successo" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;