
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, MenuItem, Button, Typography, Box } from "@mui/material";

const DatabaseConfig = () => {
  const [config, setConfig] = useState({
    dbType: "postgresql",
    host: "",
    user: "",
    password: "",
    database: "",
  });

  const handleChange = (event) => {
    setConfig({ ...config, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/config", config);
      alert("Configurazione salvata con successo!");
    } catch (error) {
      alert("Errore nel salvataggio della configurazione.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Configura il tuo Database</Typography>
        <TextField select label="Tipo di Database" name="dbType" value={config.dbType} onChange={handleChange} fullWidth margin="normal">
          <MenuItem value="postgresql">PostgreSQL</MenuItem>
          <MenuItem value="mysql">MySQL</MenuItem>
          <MenuItem value="mongodb">MongoDB</MenuItem>
        </TextField>
        <TextField label="Host" name="host" value={config.host} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="User" name="user" value={config.user} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" name="password" type="password" value={config.password} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Database" name="database" value={config.database} onChange={handleChange} fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Salva Configurazione</Button>
      </Box>
    </Container>
  );
};

export default DatabaseConfig;
