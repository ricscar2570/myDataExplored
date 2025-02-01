import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, Card, CardContent } from "@mui/material";

const DatabaseConfig = () => {
  const [config, setConfig] = useState({
    host: "",
    user: "",
    password: "",
    database: "",
  });
  
  

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/config", config); // Invia la configurazione al backend
      alert("Configurazione salvata con successo!");
    } catch (error) {
      console.error("Errore nel salvataggio della configurazione:", error);
      alert("Errore nel salvataggio della configurazione");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Card sx={{ width: "100%", backgroundColor: "rgba(255,255,255,0.1)", padding: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary">🔧 Configurazione Database</Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField name="host" label="Host" variant="outlined" fullWidth required onChange={handleChange} />
              <TextField name="user" label="Utente" variant="outlined" fullWidth required onChange={handleChange} />
              <TextField name="password" label="Password" type="password" variant="outlined" fullWidth required onChange={handleChange} />
              <TextField name="database" label="Nome Database" variant="outlined" fullWidth required onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary">Salva Configurazione</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default DatabaseConfig;
