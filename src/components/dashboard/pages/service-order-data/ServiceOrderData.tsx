import './service-order-data.scss'
import { useEffect, useState } from 'react';
import { Typography, Paper, Divider, Button, Box, Tooltip, IconButton } from '@mui/material';
import { findAllServiceOrders, updateServiceOrder } from '@service/ServiceOrderService';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, Cancel, Print } from '@mui/icons-material';
import { StatusOrder, ServiceOrder } from '@domain/service-order';
import { EMPTY } from '@utils/string-utils';
import { financialAdd } from '@service/FinancialService';
import FinancialModal from '../financial-data/financial-modal/FinancialModal';
import { Financial } from '@domain/financial';
import { updateClient } from '@service/UserService';
import { Client } from '@domain/user';

export default function ServiceOrderData() {
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>(StatusOrder.PENDING.status);
    const [currentOrder, setCurrentOrder] = useState<ServiceOrder | null>(null);
    const [_, setIncome] = useState<number>(0);
    const [__, setExpense] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const { userId } = useParams();

    function finalStatuses(status: string): boolean {
        return status === StatusOrder.CANCELED.status || status === StatusOrder.COMPLETED.status;
    }

    function newOrderService(): void | Promise<void> {
        return navigate(`/dashboard/${userId}/add-service`);
    }

    function handleOpenModal(order: ServiceOrder) {
        setCurrentOrder(order);
        setIncome(order.serviceValue);
        setExpense(0);
        setOpenModal(true);
    }

    async function handleOSCompleted(income: number, expense: number) {
        if (!currentOrder) return;

        const newFinancial = new Financial(
            undefined,
            currentOrder,
            currentOrder.collaborator,
            income,
            expense
        );

        const newServiceToClient: Client = currentOrder.client;
        newServiceToClient.serviceHistory.push(currentOrder.id)
    
        await financialAdd(newFinancial);
        await updateClient(currentOrder.client.id, newServiceToClient);

        await updateServiceOrder(currentOrder.id, {
            ...currentOrder,
            status: StatusOrder.COMPLETED.status
        });

        setServiceOrders(prev => prev.filter(o => o.id !== currentOrder.id));
        setOpenModal(false);
        setCurrentOrder(null);
    }

    async function acceptOrder(order: ServiceOrder): Promise<void> {
        if (order.status === StatusOrder.PENDING.status) {
            order.status = StatusOrder.IN_PROGRESS.status;
            await updateServiceOrder(order.id, { ...order, status: order.status });
                
            setServiceOrders(prev =>
                prev.filter(it => it.id !== order.id)
            );
        } else if (order.status === StatusOrder.IN_PROGRESS.status) {
            handleOpenModal(order);
        }
    }

    function typeOrderMenssage(order: ServiceOrder): string {
        if (order.status === StatusOrder.PENDING.status) {
            return 'Clique para aceitar!';
        } else  {
            return 'Clique para finalizar!';
        }
    }

    async function cancelOrder(order: ServiceOrder): Promise<void> {    
        await updateServiceOrder(order.id, { ...order, status: StatusOrder.CANCELED.status });
        setServiceOrders(prev =>
            prev.filter(it => it.id !== order.id)
        );
    }

    useEffect(() => {
        async function loadData() {
            const orders = await findAllServiceOrders();
            setServiceOrders(
                selectedStatus
                    ? orders.filter(order => order?.status === selectedStatus)
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
                    onClick={() => newOrderService()}
                >
                    Nova Ordem de Serviço
                </Button>
            </Box>

            <Box className='order-status'>
                {Object.values(StatusOrder).map((it) => {
                    const { label, color } = StatusOrder.getStatusColorAndLabel(it?.status);
                    return (
                        <Typography
                            key={it?.status}
                            variant="body1"
                            className={`status-title ${selectedStatus === it?.status ? 'active' : EMPTY}`}
                            onClick={() => setSelectedStatus(it?.status)}
                            style={{ color: selectedStatus === it?.status ? color : undefined }}
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
                                            {!finalStatuses(order.status) && (
                                                <Tooltip 
                                                    title="Click to cancel order" 
                                                    className='button-cancel'
                                                    onClick={() => cancelOrder(order)}
                                                >
                                                    <IconButton>
                                                        <Cancel/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            <Typography variant="h6" style={{ color }}>
                                                {label}
                                            </Typography>
                                            <Tooltip title="Click to scanner" className='button'>
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

                            <Typography variant="body2"mt={1}>R$: {order.serviceValue}</Typography>
                            <Typography variant="body2">Colaborador: {order.collaborator.name}</Typography>
                            {!finalStatuses(order.status) && (
                                <Box 
                                    className='order-button'>
                                    <Typography variant="body2" className='secondary-title'>{typeOrderMenssage(order)}</Typography>
                                    <Tooltip title="Click to new client" className='button'>
                                        <IconButton onClick={() => acceptOrder(order)}>
                                            <Add/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                        </Paper>
                    ))
                )}
            </div>
            {serviceOrders.map(order => (
                <FinancialModal
                    order={order}
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onConfirm={handleOSCompleted}
                    incomeDefault={currentOrder?.serviceValue ?? 0}
                />
            ))}
        </>
    );
}
