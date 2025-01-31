import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/admin/users")
            .then((res) => res.json())
            .then(setUsers);
    }, []);

    return (
        <Box>
            <Typography variant="h4">Gestione Utenti</Typography>
            {users.map((user) => (
                <Box key={user._id} display="flex" justifyContent="space-between">
                    <Typography>{user.username}</Typography>
                    <Select value={user.role}>
                        <MenuItem value="user">Utente</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    <Select value={user.sector}>
                        <MenuItem value="finance">Finanza</MenuItem>
                        <MenuItem value="marketing">Marketing</MenuItem>
                        <MenuItem value="ecommerce">E-commerce</MenuItem>
                    </Select>
                    <Button color="secondary">Elimina</Button>
                </Box>
            ))}
        </Box>
    );
};

export default AdminDashboard;