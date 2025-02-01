const { MongoClient } = require("mongodb");

/**
 * Connessione a MongoDB
 * @returns {Promise<Db>} Istanza del database MongoDB
 */
async function connectMongoDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("✅ Connessione a MongoDB stabilita.");
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error("❌ Errore nella connessione a MongoDB:", error);
    throw error;
  }
}

module.exports = { connectMongoDB };
