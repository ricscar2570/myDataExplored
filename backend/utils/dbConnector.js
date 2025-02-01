const { Pool } = require("pg");
const mysql = require("mysql2/promise");
const { connectMongoDB } = require("./mongodbConnector"); // Importa la funzione

async function connectDB() {
  const dbType = process.env.DB_TYPE;

  if (dbType === "postgresql") {
    return new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 5432,
    });
  } else if (dbType === "mysql") {
    return await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  } else {
    throw new Error("Database non supportato");
  }
}

// Funzione per ottenere il connettore corretto
async function getDBConnector() {
  const dbType = process.env.DB_TYPE;

  if (dbType === "postgresql" || dbType === "mysql") {
    return connectDB(); // Ritorna la connessione SQL
  } else if (dbType === "mongodb") {
    return connectMongoDB(); // Ritorna la connessione MongoDB
  } else {
    throw new Error("Database non supportato");
  }
}

module.exports = { connectDB, getDBConnector }; // Esporta entrambe le funzioni