import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Box, TextField, Button, Card, CardContent, CircularProgress } from "@mui/material";

const QueryTester = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExecuteQuery = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/query", { query });
      setResult(response.data);
    } catch (error) {
      setResult({ error: "Errore nell'esecuzione della query" });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Card sx={{ width: "100%", backgroundColor: "rgba(255,255,255,0.1)", padding: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary">🖥️ Esegui una Query</Typography>

            <TextField
              label="Scrivi la tua query SQL"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ mt: 2, backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
            />

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleExecuteQuery}>
              Esegui Query
            </Button>

            {loading && <CircularProgress sx={{ mt: 2 }} />}

            {result && (
              <Box sx={{ mt: 3, padding: 2, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                <Typography variant="body1" color="textPrimary">
                  {result.error ? `❌ Errore: ${result.error}` : `✅ Risultato: ${JSON.stringify(result, null, 2)}`}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default QueryTester;
