import './client-details.scss';
import { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { Client } from "@domain/user/Client";
import { clientAdd } from '@service/UserService';

export default function ClientDetails() {
    const [client, setClient] = useState<Client>(new Client());

    const handleChange = (field: keyof Client, value: any) => {
        setClient((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newClient = { ...client, createdAt: new Date() };
        await clientAdd(newClient);
        setClient(new Client());
        alert('Cliente registrado com sucesso!');
    };

    return (
        <Container className='container'>
            <form onSubmit={handleSubmit} className="form">
                <h2>Novo Cliente</h2>
                <Box mb={2}>
                    <TextField
                        label="Nome"
                        value={client.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Telefone"
                        value={client.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Email"
                        type="email"
                        value={client.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Rua"
                        value={client.street}
                        onChange={(e) => handleChange("street", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Número"
                        type="number"
                        value={client.houserNumber ?? ""}
                        onChange={(e) => handleChange("houserNumber", Number(e.target.value))}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Cidade"
                        value={client.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Estado"
                        value={client.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="CEP"
                        value={client.zipCode}
                        onChange={(e) => handleChange("zipCode", e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="País"
                        value={client.country}
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
    );
}
