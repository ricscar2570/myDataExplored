const nodemailer = require("nodemailer");

// Configurazione del trasporto email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ALERT_EMAIL_USER,  // Email mittente
    pass: process.env.ALERT_EMAIL_PASS,  // Password generata da Google App Passwords
  },
});

/**
 * Funzione per inviare un'email di allerta SQL Injection
 * @param {string} query - La query sospetta
 * @param {string} ip - L'indirizzo IP del client
 */
async function sendAlertEmail(query, ip) {
  const mailOptions = {
    from: process.env.ALERT_EMAIL_USER,
    to: process.env.ALERT_EMAIL_ADMIN, // Email destinatario (Admin)
    subject: "🚨 MyDataExplored: Tentativo di SQL Injection rilevato!",
    text: `Un tentativo di SQL Injection è stato rilevato nel sistema.\n
           🔍 Dettagli dell'attacco:\n
           - Query sospetta: ${query}\n
           - Indirizzo IP: ${ip}\n
           ⚠️ Si consiglia di verificare immediatamente il sistema.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Alert email inviata all'amministratore.");
  } catch (error) {
    console.error("❌ Errore nell'invio dell'email di alert:", error);
  }
}

module.exports = { sendAlertEmail };
