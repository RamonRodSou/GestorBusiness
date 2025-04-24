import './home.scss';
import { Box, Container, Button, Typography } from '@mui/material';
import ClientGraph from './client-graph/ClientGraph';
import CardData from './card-data/CardData';
import FinancialGraph from './financial-graph/FinancialGraph';

export default function Home() {

    return (
        <Container className="home-container">
            <Typography variant="h4" className='title'>Painel Geral</Typography>
            <FinancialGraph/>
            <ClientGraph/>
            <CardData/>
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
