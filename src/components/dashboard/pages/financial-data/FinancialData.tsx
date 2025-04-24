import './financial-data.scss'
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Container
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Financial } from '@domain/financial';
import { findAllFinancials } from '@service/FinancialService';

export default function FinancialData() {
    const [records, setRecords] = useState<Financial[]>([]);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate(); 
    const { userId } = useParams();

    const isColorRed = balance >= 0 ? '#e8f5e9' : '#ffebee';
    
    function newFinancial() {
        return navigate(`/dashboard/${userId}/add-financial`);
    }
 
    useEffect(() => {
        async function load() {
          const data = await findAllFinancials();
          setRecords(data);
          const total = data.reduce((sum, item) => sum + (item.income - item.expense), 0);
          setBalance(total);
        }
        load();
    }, []);

    return (
        <Container className='finacial-container'>
            <Typography variant="h4" component="h1" className='title'>
                Painel Financeiro
            </Typography>

            <Paper elevation={3} sx={{ bgcolor: isColorRed }} className='currrent-cash'>
                <Typography variant="h6">
                    Saldo Atual:
                </Typography>
                <Typography variant="h4" color={balance >= 0 ? 'green' : 'error'}>
                    R$ {balance.toFixed(2)}
                </Typography>
            </Paper>
            <Box className='service-order'>
                {records.map((item) => (
                    <Paper
                        key={item.id}
                        elevation={2}
                        className='order-card'
                    >
                        <Typography variant="subtitle2" className='title-secondary'>
                            Ordem de Serviço
                        </Typography>
                        <Typography variant="body1" className='title-secondary'>{item.serviceOrder?.orderNumber}</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body2">Entrada: R$ {item.income}</Typography>
                        <Typography variant="body2">Saída: R$ {item.expense}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                            Saldo: R$ {(item.income - item.expense).toFixed(2)}
                        </Typography>
                        <Typography variant="body2">Colaborador: {item.collaborator?.name}</Typography>
                        <Typography variant="caption" display="block" mt={1}>
                            Criado em: {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                    </Paper>
                ))}
            </Box>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() =>newFinancial()}
            >
                Nova Movimentação
            </Button>
      </Container>
    );
}
