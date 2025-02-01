import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import DatabaseConfig from "./pages/DatabaseConfig";
import QueryTester from "./pages/QueryTester";
import Dashboard from "./pages/Dashboard";
import CustomThemeProvider, { ColorModeContext } from "./theme/ThemeProvider";
import { Container, Button, Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <MainApp />
      </CustomThemeProvider>
    </Provider>
  );
}

function MainApp() {
  const colorMode = useContext(ColorModeContext);

  return (
    <Router>
      <Container maxWidth="md">
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/config" variant="contained">Configura Database</Button>
            <Button component={Link} to="/query" variant="contained" color="secondary">Test Query</Button>
            <Button component={Link} to="/dashboard" variant="contained" color="primary">Dashboard</Button>
          </Box>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {colorMode.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Routes>
          <Route path="/config" element={<DatabaseConfig />} />
          <Route path="/query" element={<QueryTester />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
