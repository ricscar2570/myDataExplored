const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint per creare un nuovo cliente Stripe e un abbonamento
router.post("/create-checkout-session", async (req, res) => {
  const { priceId, userEmail } = req.body;

  try {
    // Creazione di una Checkout Session di Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // Modalità di pagamento in abbonamento
      payment_method_types: ["card"], // Metodi di pagamento consentiti
      line_items: [
        {
          price: priceId, // ID del prezzo del prodotto/servizio da Stripe
          quantity: 1,
        },
      ],
      // Impostazione del successo e del fallimento del pagamento
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: userEmail, // Email del cliente
    });

    res.json({ sessionId: session.id }); // Invio dell'ID della sessione al frontend
  } catch (error) {
    console.error("Errore nella creazione della Checkout Session:", error);
    res.status(500).json({ error: "Errore nella creazione della Checkout Session" });
  }
});

// Endpoint per ottenere una Checkout Session tramite ID
router.get("/checkout-session/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
  } catch (error) {
    console.error("Errore nel recupero della Checkout Session:", error);
    res.status(500).json({ error: "Errore nel recupero della Checkout Session" });
  }
});

module.exports = router;