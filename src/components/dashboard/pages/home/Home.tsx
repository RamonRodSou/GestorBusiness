import './home.scss';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from 'recharts';

export default function Home() {
    const totalClients = 120;
    const currentCash = 5240.75;
    const monthInflow = 2300.00;
    const monthOutflow = 900.00;

    const dataFinancial = [
        { month: 'Jan', cash: 3200, outflow: 800 },
        { month: 'Fev', cash: 3500, outflow: 900 },
        { month: 'Mar', cash: 4000, outflow: 1000 },
        { month: 'Abr', cash: 4500, outflow: 850 },
        { month: 'Mai', cash: 4800, outflow: 950 },
        { month: 'Jun', cash: 5000, outflow: 1000 },
        { month: 'Jul', cash: 5200, outflow: 1050 },
        { month: 'Ago', cash: 5240, outflow: 900 },
        { month: 'Set', cash: 5400, outflow: 1100 },
        { month: 'Out', cash: 5600, outflow: 1200 },
        { month: 'Nov', cash: 5900, outflow: 1150 },
        { month: 'Dez', cash: 6200, outflow: 1000 },
    ];

    const dataClient = [
        { month: 'Jan', newClient: 5, },
        { month: 'Fev', newClient: 3, },
        { month: 'Mar', newClient: 7, },
        { month: 'Abr', newClient: 4, },
        { month: 'Mai', newClient: 6, },
        { month: 'Jun', newClient: 8, },
        { month: 'Jul', newClient: 5, },
        { month: 'Ago', newClient: 4, },
        { month: 'Set', newClient: 6, },
        { month: 'Out', newClient: 3, },
        { month: 'Nov', newClient: 4, },
        { month: 'Dez', newClient: 5, },
    ];

    return (
        <Container className="home-container">
            <Typography variant="h4" className='home-title'>Painel Geral</Typography>
            <Typography variant="h5" gutterBottom className='home-title'>📈 Finanças do Ano</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataFinancial}>
                    <Line type="monotone" dataKey="cash" stroke="#4caf50" strokeWidth={3} name="Saldo"/>
                    <Line type="monotone" dataKey="outflow" stroke="#f44336" strokeWidth={3} name="Saídas"/>
                    <CartesianGrid stroke="#ccc"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }} className='home-title'>👥 Movimento de Clientes</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataClient}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="newClient" fill="#2196f3" name="Entradas"/>
                </BarChart>
            </ResponsiveContainer>

            <Box className="home-statistics">
                <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                    <Typography className='home-title' variant="h6">Total de Membros</Typography>
                    <Typography variant="h4">{totalClients}</Typography>
                </Paper>
                <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                    <Typography className='home-title' variant="h6">Saldo Atual</Typography>
                    <Typography variant="h4">R$ {currentCash.toFixed(2)}</Typography>
                </Paper>
                <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                    <Typography className='home-title' variant="h6">Entradas no Mês</Typography>
                    <Typography variant="h4">R$ {monthInflow.toFixed(2)}</Typography>
                </Paper>
                <Paper className="home-card" elevation={3} sx={{ flex: '1 1 220px', p: 2, textAlign: 'center' }}>
                    <Typography className='home-title' variant="h6">Saídas no Mês</Typography>
                    <Typography variant="h4">R$ {monthOutflow.toFixed(2)}</Typography>
                </Paper>
            </Box>

            <Box className="home-fast-action">
                <Button variant="contained" color="primary">➕ Novo Cliente</Button>
                <Button variant="contained" color="success">💰 Registrar Entrada</Button>
                <Button variant="contained" color="error">📤 Registrar Saída</Button>
                <Button variant="outlined">📋 Ver Clientes</Button>
                <Button variant="outlined">📒 Relatórios</Button>
            </Box>
        </Container>
    );
}
