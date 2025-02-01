import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/dataSlice";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Container, Typography, Box, CircularProgress, Select, MenuItem, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.data);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchData(filter));
  }, [filter, dispatch]);

  const chartOptions = {
    chart: { type: "column", backgroundColor: "transparent" },
    title: { text: "📊 Distribuzione dei dati per categoria", style: { color: "#fff", fontSize: "18px" } },
    xAxis: { type: "category", labels: { style: { color: "#fff" } } },
    yAxis: { title: { text: "Valore Totale", style: { color: "#fff" } } },
    series: [{ name: "Valore", data: data.map(item => ({ name: item.category, y: item.value })), colorByPoint: true }],
    plotOptions: {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              alert("Dettaglio categoria: " + this.name);
            },
          },
        },
      },
    },
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Card sx={{ width: "100%", backgroundColor: "rgba(255,255,255,0.1)", padding: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary">📊 Dashboard Interattiva</Typography>
            
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ mb: 2, width: "100%", backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              <MenuItem value="all">Tutti</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="tech">Tech</MenuItem>
            </Select>

            {loading ? (
              <CircularProgress sx={{ mt: 2 }} />
            ) : (
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
