const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const connectDB = require("../utils/dbConnector");
const { connectMongoDB } = require("../utils/mongodbConnector");

const router = express.Router();

// Definizione dello schema GraphQL
const schema = buildSchema(`
  type Data {
    id: ID
    category: String
    value: Float
    timestamp: String
  }

  type MongoData {
    _id: ID
    category: String
    value: Float
  }

  type Query {
    getAllData: [Data]
    getAggregateData: [Data]
    getMongoData(collection: String!): [MongoData]
  }
`);

// Resolver per gestire le query
const root = {
  // Recupera tutti i dati da PostgreSQL o MySQL
  getAllData: async () => {
    const db = await connectDB();
    const result = await db.query("SELECT * FROM data");
    return result.rows;
  },

  // Aggrega i dati per categoria in PostgreSQL o MySQL
  getAggregateData: async () => {
    const db = await connectDB();
    const result = await db.query("SELECT category, SUM(value) as total FROM data GROUP BY category");
    return result.rows;
  },

  // Recupera dati dinamicamente da MongoDB
  getMongoData: async ({ collection }) => {
    const db = await connectMongoDB();
    const data = await db.collection(collection).find({}).toArray();
    return data;
  },
};

// Middleware GraphQL
router.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Abilita GraphiQL per testare le query
  })
);

module.exports = router;
