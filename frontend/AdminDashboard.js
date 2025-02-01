import React, { useEffect, useState } from "react";
import axios from "axios"; // Importa axios
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";

const AdminDashboard = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Errore nel recupero degli utenti:", error);
      }
    };

    fetchUsers();
  },);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, { role: newRole });
      setUsers(users.map(user => (user._id === userId? {...user, role: newRole }: user)));
    } catch (error) {
      console.error("Errore nell'aggiornamento del ruolo:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id!== userId));
    } catch (error) {
      console.error("Errore nell'eliminazione dell'utente:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Gestione Utenti</Typography>
      {users.map((user) => (
        <Box key={user._id} display="flex" justifyContent="space-between" alignItems="center">
          <Typography>{user.username}</Typography>
          <Select value={user.role} onChange={(e) => handleUpdateRole(user._id, e.target.value)}>
            <MenuItem value="user">Utente</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
          <Select value={user.sector}>
            {/*... */}
          </Select>
          <Button color="secondary" onClick={() => handleDeleteUser(user._id)}>Elimina</Button>
        </Box>
      ))}
    </Box>
  );
};

export default AdminDashboard;