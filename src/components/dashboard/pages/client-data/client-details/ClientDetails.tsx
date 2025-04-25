import './client-details.scss';
import { useContext, useEffect, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { Client } from "@domain/user/client/Client";
import { clientAdd, updateClient, findByClientId } from '@service/UserService';
import BackButton from '@components/back-button/BackButton';
import { EMPTY } from '@utils/string-utils';
import { useNavigate, useParams } from 'react-router-dom';
import { ManagerContext } from '@context/ManagerContext';

export default function ClientDetails() {
    const { clientId, userId } = useParams();
    const navigate = useNavigate();
    const { setOpenSnackbar } = useContext(ManagerContext);
    const [data, setData] = useState<Client>(new Client());
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const isEditOrNew = isEditing ? `Editar Cliente: ${data.name}` : 'Novo Cliente'

    const handleChange = (field: keyof Client, value: string | number) => {
        setData(prev => {
            const updated = { ...prev, [field]: value };
            return Client.fromJson(updated);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            await updateClient(data.id, data.toJSON());
        } else {
            await clientAdd(data); 
            setData(new Client());
        }

        navigate(`/dashboard/${userId}/clients`);
        setOpenSnackbar(true);
    };

    useEffect(() => {
        async function loadClient() {
            if (clientId) {
                const clientData = await findByClientId(clientId);
                setData(Client.fromJson(clientData));
                setIsEditing(true);
            }
        }
        loadClient();
    }, [clientId]);

    return (
        <>
            <BackButton path={'clients'}/>
            <Container className='details-container'>
                <form onSubmit={handleSubmit} className="details-form">
                    <h2>{isEditOrNew}</h2>
                    <Box mb={2}>
                        <TextField
                            label="Nome"
                            value={data.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Telefone"
                            value={data.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Rua"
                            value={data.street}
                            onChange={(e) => handleChange("street", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Número"
                            type="number"
                            value={data.houserNumber ?? EMPTY}
                            onChange={(e) => handleChange("houserNumber", Number(e.target.value))}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Cidade"
                            value={data.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Estado"
                            value={data.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="CEP"
                            value={data.zipCode}
                            onChange={(e) => handleChange("zipCode", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="País"
                            value={data.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Salvar Cliente
                    </Button>
                </form>
            </Container>
        </>
    );
}
