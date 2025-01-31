
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DatabaseConfig from "./pages/DatabaseConfig";
import QueryTester from "./pages/QueryTester";
import { Container, Button, Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button component={Link} to="/config" variant="contained">Configura Database</Button>
          <Button component={Link} to="/query" variant="contained" color="secondary">Test Query</Button>
        </Box>
        <Routes>
          <Route path="/config" element={<DatabaseConfig />} />
          <Route path="/query" element={<QueryTester />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
