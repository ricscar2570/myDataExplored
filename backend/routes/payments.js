const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Creazione di un abbonamento
router.post("/subscribe", async (req, res) => {
  try {
    const { email, paymentMethodId, plan } = req.body;

    // Creazione cliente Stripe
    const customer = await stripe.customers.create({ email });

    // Creazione abbonamento
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan }], // ID del piano da Stripe
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.json({ subscriptionId: subscription.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
