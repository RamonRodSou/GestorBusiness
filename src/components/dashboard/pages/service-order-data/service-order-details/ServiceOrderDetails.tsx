import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField, Box, Button, Container } from "@mui/material";
import { serviceOrderAdd, findAllServiceOrders } from "@service/ServiceOrderService";
import BackButton from "@components/back-button/BackButton";
import { Client, CollaboratorSummary } from "@domain/user";
import { findAllClients } from "@service/UserService";
import { EMPTY } from "@utils/string-utils";
import { findAllCollaborators } from "@service/CollaboratorService";
import { ServiceOrder, StatusOrder } from "@domain/service-order";
import SnackBarMessage from "@components/snackBarMessage/SnackBarMessage";
import { useNavigate, useParams } from "react-router-dom";
import { ManagerContext } from "@context/ManagerContext";

export default function ServiceOrderDetails() {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [collaborators, setCollaborators] = useState<CollaboratorSummary[]>([]);
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorSummary | null>(null);
    const [description, setDescription] = useState<string>(EMPTY);
    const [orderNumber, setOrderNumber] = useState<number>(1);
    const [serviceValue, setServiceValue] = useState<number>(0);
    const { openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage } = useContext(ManagerContext);
    const navigate = useNavigate();
    const { userId } = useParams();

    async function addServiceOrderRecord(
        selectedClient: Client, 
        selectedCollaborator: CollaboratorSummary
    ): Promise<void> {
        
        const newOrder = new ServiceOrder(
            description,
            selectedClient,
            selectedCollaborator,
            StatusOrder.PENDING.status,
            orderNumber,
            serviceValue,
            new Date().toISOString(),
        );
        await serviceOrderAdd(newOrder);

        const updatedOrders = await findAllServiceOrders();
        const lastNumber = updatedOrders.length > 0
            ? Math.max(...updatedOrders.map(order => Number(order.orderNumber) || 0))
            : 0;
        setOrderNumber(lastNumber + 1);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient || !selectedCollaborator) return;
    
        try {
            addServiceOrderRecord(selectedClient, selectedCollaborator)
            setDescription(EMPTY);
            setSelectedClient(null);
            setSelectedCollaborator(null);
            setServiceValue(0);
        } catch (err) {
            console.error("Erro ao salvar ordem de serviço:", err);
        }
        navigate(`/dashboard/${userId}/service-order`);
        setOpenSnackbar(true);
        setSnackbarMessage('Ordem de serviço cadastrada com sucesso!')
    };

    useEffect(() => {
        async function loadData() {
            const clientList = await findAllClients();
            setClients(clientList);


            const collaboratorList = await findAllCollaborators();
            setCollaborators(collaboratorList);

            const orders = await findAllServiceOrders();
            const lastOrderNumber = orders.length > 0
                ? Math.max(...orders.map(order => order.orderNumber))
                : 0;
            setOrderNumber(lastOrderNumber + 1);
        }

        loadData();
    }, []);

    return (
        <>
            <BackButton path={'service-order'} />
            <Container className='details-container'>
                <form onSubmit={handleSubmit} className="details-form">
                    <h2>Nova Ordem de Serviço</h2>
                    
                    <Box mb={2}>
                        <Autocomplete
                            options={collaborators}
                            getOptionLabel={(option) => option.name}
                            value={selectedCollaborator}
                            onChange={(_, newValue) => setSelectedCollaborator(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Colaborador" required />
                            )}
                        />
                    </Box>

                    <Box mb={2}>
                        <Autocomplete
                            options={clients}
                            getOptionLabel={(option) => option.name}
                            value={selectedClient}
                            onChange={(_, newValue) => setSelectedClient(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Cliente" required />
                            )}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Descrição"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Valor do Serviço"
                            type="number"
                            value={serviceValue}
                            onChange={(e) => setServiceValue(parseFloat(e.target.value))}
                            fullWidth
                            required
                        />
                    </Box>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Salvar Ordem
                    </Button>
                    <SnackBarMessage 
                        message={snackbarMessage} 
                        openSnackbar={openSnackbar} 
                        setOpenSnackbar={setOpenSnackbar}
                    />
                </form>
            </Container>
        </>
    );
}
