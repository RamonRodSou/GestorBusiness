import './service-order-data.scss'
import { useEffect, useState } from 'react';
import { Typography, Paper, Divider, Button, Box, Tooltip, IconButton } from '@mui/material';
import { findAllServiceOrders, updateServiceOrder } from '@service/ServiceOrderService';
import { ServiceOrder } from '@domain/service-order/Service-order';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusOrder } from '@domain/service-order/Status-order';
import { Add, Print } from '@mui/icons-material';
import { EMPTY } from '@utils/string-utils';

export default function ServiceOrderData() {
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [selectedStatus, setSelectedStatus] = useState(StatusOrder.PENDING.status);

    const navigate = useNavigate();
    const { userId } = useParams();

    function newFinancial() {
        return navigate(`/dashboard/${userId}/add-service`);
    }

    function acceptOrder(order: ServiceOrder): void {
        order.status = StatusOrder.IN_PROGRESS.status;
        updateServiceOrder(order.id, order);
    }

    useEffect(() => {
        async function loadData() {
            const orders = await findAllServiceOrders();
            setServiceOrders(
                selectedStatus
                    ? orders.filter(order => order.status === selectedStatus)
                    : orders
            );
        }
        loadData();
    }, [selectedStatus]);

    return (
        <>
            <Box className='order-header'>
                <Typography variant="h4" gutterBottom className='title'>
                    Ordens de Serviço
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() =>newFinancial()}
                >
                    Nova Ordem de Serviço
                </Button>
            </Box>

            <Box className='order-status'>
                {Object.values(StatusOrder).map((statusObj) => {
                    const { label, color } = StatusOrder.getStatusColorAndLabel(statusObj.status);
                    return (
                        <Typography
                            key={statusObj.status}
                            variant="body1"
                            className={`status-title ${selectedStatus === statusObj.status ? 'active' : ''}`}
                            onClick={() => setSelectedStatus(statusObj.status)}
                            style={{ color: selectedStatus === statusObj.status ? color : undefined }}
                        >
                            {label}
                        </Typography>
                    );
                })}
            </Box>
            <div className='container-order'>
                {serviceOrders.length === 0 ? (
                    <Typography variant="body1" className='title-secondary'>Nenhuma ordem de serviço pendente.</Typography>
                ) : (
                    serviceOrders.map(order => (
                        <Paper key={order.id} className='paper-order' elevation={3}>
                            <Box className='status-order'>
                                <span>
                                    <Typography variant="h6" className='title-secondary'>Ordem Nº {order.orderNumber}</Typography>
                                    <Typography variant="caption" display="block" mt={1}>Criado em: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                </span>
                                {(() => {
                                    const { label, color } = StatusOrder.getStatusColorAndLabel(order.status);
                                    return (
                                        <Box display={'flex'} flexDirection={'column'} alignItems={'end'}>
                                            <Typography variant="h6" style={{ color }}>
                                                {label}
                                            </Typography>
                                            <Tooltip title="Click to new client" className='button'>
                                                <IconButton>
                                                    <Print/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    );
                                })()}
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">Serviço: {order.description}</Typography>
                            <Typography variant="body2">Cliente: {order.client.name}</Typography>
                            <Typography variant="body2">Telefone: {order.client.phone}</Typography>
                            <Typography variant="body2">Rua: {order.client.street}</Typography>
                            <Typography variant="body2">Número: {order.client.houserNumber}</Typography>
                            <Typography variant="body2">Cidade: {order.client.city}</Typography>
                            <Typography variant="body2">Estado: {order.client.state}</Typography>

                            <Typography variant="body2"  mt={1}>Colaborador: {order.collaborator.name}</Typography>

                            <Box className='order-button'>
                                <Typography variant="body2" className='secondary-title'>Clique para aceitar</Typography>
                                <Tooltip title="Click to new client" className='button'>
                                    <IconButton onClick={() => acceptOrder(order)}>
                                        <Add/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Paper>
                    ))
                )}

            </div>
        </>
    );
}
