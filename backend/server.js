
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const configRoutes = require("./routes/configRoutes");
const queryRoutes = require("./routes/queryRoutes");
const mongoRoutes = require("./routes/mongoRoutes");
const graphqlRoutes = require("./routes/graphqlRoutes");
const { router: webhookRoutes } = require("./routes/webhookRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Rotte
app.use("/api/config", configRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/mongo", mongoRoutes);
app.use("/api/graphql", graphqlRoutes);
app.use("/api/webhook", webhookRoutes);

// Avvio del server
app.listen(PORT, () => console.log(`🚀 Server in esecuzione sulla porta ${PORT}`));
