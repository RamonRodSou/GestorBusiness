import './card-data.scss'
import { Client } from "@domain/user/client/Client";
import { Box, Paper, Typography } from "@mui/material";
import { findAllClients } from "@service/UserService";
import { useEffect, useState } from "react";

export default function CardData() {
    const [data, setData] = useState<Client[]>([]);

    const totalClients = data.length;
    const currentCash = 5240.75;
    const monthInflow = 2300.00;
    const monthOutflow = 900.00;

    useEffect(() => {
        findAllClients()
            .then((it) => {
                setData(it)
            });
    }, []);

    return (
        <Box className="home-statistics">
            <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                <Typography className='title-secondary' variant="h6">Total de clientes</Typography>
                <Typography variant="h4">{totalClients}</Typography>
            </Paper>
            <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                <Typography className='title-secondary' variant="h6">Saldo Atual</Typography>
                <Typography variant="h4">R$ {currentCash.toFixed(2)}</Typography>
            </Paper>
            <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                <Typography className='title-secondary' variant="h6">Entradas no Mês</Typography>
                <Typography variant="h4">R$ {monthInflow.toFixed(2)}</Typography>
            </Paper>
            <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                <Typography className='title-secondary' variant="h6">Saídas no Mês</Typography>
                <Typography variant="h4">R$ {monthOutflow.toFixed(2)}</Typography>
            </Paper>
        </Box>
    )
}