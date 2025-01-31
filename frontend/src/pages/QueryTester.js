
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";

const QueryTester = () => {
  const [query, setQuery] = useState("");
  const [params, setParams] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleParamsChange = (event) => {
    setParams(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const parsedParams = params ? JSON.parse(params) : [];
      const response = await axios.post("http://localhost:5000/api/query", { query, params: parsedParams });
      setResult(response.data);
    } catch (err) {
      setError("Errore nell'esecuzione della query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Esegui una Query sul Database in sicurezza</Typography>
        <TextField label="Query SQL (usa ? o $1 per i parametri)" variant="outlined" fullWidth multiline rows={3} value={query} onChange={handleChange} margin="normal" />
        <TextField label="Parametri (JSON: [val1, val2])" variant="outlined" fullWidth value={params} onChange={handleParamsChange} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Esegui Query Sicura</Button>

        {loading && <CircularProgress sx={{ mt: 2 }} />}
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
        )}

        {result && (
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: "5px" }}>
            <Typography variant="h6">Risultati:</Typography>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default QueryTester;
