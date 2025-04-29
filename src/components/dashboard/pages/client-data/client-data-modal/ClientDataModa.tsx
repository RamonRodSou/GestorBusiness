import './client-data-modal.scss';
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { Client } from '@domain/user/client/Client';
import { Edit } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface ClientDataModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

export default function ClientDataModal({ open, onClose, client }: ClientDataModalProps) {
    const navigate = useNavigate();
    const { userId } = useParams();

    if (!client) return null;

    function clientUpdate(clientId: String) {
        return navigate(`/dashboard/${userId}/edit-client/${clientId}`);
    }
         
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent dividers>
                <Box className='title-and-editBtn'>
                    <Typography className='title'>{client.name}</Typography>
                    <IconButton onClick={() => clientUpdate(client.id)} className='editBtn'>
                        <Edit/>
                    </IconButton>
                </Box>
                <Typography>Telefone: {client.phone}</Typography>
                <Typography>Rua: {client.street}</Typography>
                <Typography>Número: {client.houseNumber}</Typography>
                <Typography>Cidade: {client.city}</Typography>
                <Typography>Estado: {client.state}</Typography>
                <Typography>CEP: {client.zipCode}</Typography>
            </DialogContent>
        </Dialog>
    );
}
