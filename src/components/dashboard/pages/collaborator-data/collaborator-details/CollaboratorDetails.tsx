import { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import BackButton from '@components/back-button/BackButton';
import { Collaborator } from '@domain/user';
import { collaboratorAdd } from '@service/CollaboratorService';
import { EMPTY } from "@utils/string-utils";
import SnackBarMessage from "@components/snackBarMessage/SnackBarMessage";

export default function CollaboratorDetails() {
    const [collaborator, setCollaborator] = useState<Collaborator>(new Collaborator());
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleChange = (field: keyof Collaborator, value: string | number) => {
        setCollaborator(prev => {
            const updated = { ...prev, [field]: value };
            return Collaborator.fromJson(updated);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await collaboratorAdd(collaborator);
        setOpenSnackbar(true);
        setCollaborator(new Collaborator());
    };

    return (
        <>
            <BackButton path={'collaborator'}/>
            <Container className='details-container'>
                <form onSubmit={handleSubmit} className="details-form">
                    <h2>Novo Colaborador</h2>
                    <Box mb={2}>
                        <TextField
                            label="Nome"
                            value={collaborator.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Telefone"
                            value={collaborator.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Email"
                            type="email"
                            value={collaborator.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Rua"
                            value={collaborator.street}
                            onChange={(e) => handleChange("street", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Número"
                            type="number"
                            value={collaborator.houserNumber ?? EMPTY}
                            onChange={(e) => handleChange("houserNumber", Number(e.target.value))}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Cidade"
                            value={collaborator.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Estado"
                            value={collaborator.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="CEP"
                            value={collaborator.zipCode}
                            onChange={(e) => handleChange("zipCode", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="País"
                            value={collaborator.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Salvar Cliente
                    </Button>
                </form>
                <SnackBarMessage 
                    message={"Cliente criado com sucesso!"} 
                    openSnackbar={openSnackbar} 
                    setOpenSnackbar={setOpenSnackbar}
                />
            </Container>
        </>
    );
}
