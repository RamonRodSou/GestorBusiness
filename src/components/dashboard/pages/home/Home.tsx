import './home.scss';
import { Container, Typography } from '@mui/material';
import ClientGraph from './client-graph/ClientGraph';
import CardData from './card-data/CardData';
import FinancialGraph from './financial-graph/FinancialGraph';
import { FinancialProvider } from '@context/FinancialContext';

export default function Home() {

    return (
        <FinancialProvider>
            <Container className="home-container">
                <Typography variant="h4" className='title'>Painel Geral</Typography>
                <FinancialGraph/>
                <ClientGraph/>
                <CardData/>
            </Container>
        </FinancialProvider>
    );
}
