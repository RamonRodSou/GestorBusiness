import { useEffect, useState } from "react";
import { Autocomplete, TextField, Box, Button, Container } from "@mui/material";
import { ServiceOrder } from "@domain/service-order/Service-order";
import { serviceOrderAdd, findAllServiceOrders } from "@service/ServiceOrderService";
import BackButton from "@components/back-button/BackButton";
import { Client, CollaboratorSummary } from "@domain/user";
import { findAllClients } from "@service/UserService";
import { EMPTY } from "@utils/string-utils";
import { Financial } from "@domain/financial";
import { findAllCollaborators } from "@service/CollaboratorService";
import { StatusOrder } from "@domain/service-order/Status-order";

export default function ServiceOrderDetails() {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [collaborators, setCollaborators] = useState<CollaboratorSummary[]>([]);
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorSummary | null>(null);
    const [description, setDescription] = useState<string>(EMPTY);
    const [orderNumber, setOrderNumber] = useState<number>(1);
    const [serviceValue, setServiceValue] = useState<number>(0);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient || !selectedCollaborator) return;
    
        const newOrder = new ServiceOrder(
            description,
            selectedClient,
            selectedCollaborator,
            new Financial(),
            StatusOrder.PENDING.status,
            orderNumber,
            serviceValue,
            new Date().toISOString(),
        );
    
        await serviceOrderAdd(newOrder);
    
        setDescription(EMPTY);
        setSelectedClient(null);
        setSelectedCollaborator(null);
    
        const updatedOrders = await findAllServiceOrders();
        const lastNumber = updatedOrders.length > 0
            ? Math.max(...updatedOrders.map(order =>  Number(order.orderNumber) || 0))
            : 0;
        setOrderNumber(lastNumber + 1);
    };
    

    return (
        <>
            <BackButton isToHome={false} />
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Valor do Serviço"
                            value={serviceValue}
                            onChange={(e) => setServiceValue(Number(e.target.value))}
                            fullWidth
                            required
                        />
                    </Box>
                    

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Salvar Ordem
                    </Button>
                </form>
            </Container>
        </>
    );
}
