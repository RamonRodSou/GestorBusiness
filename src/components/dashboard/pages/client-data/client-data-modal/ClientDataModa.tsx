import './client-data-modal.scss';
import { Dialog, DialogContent, Typography } from '@mui/material';
import { Client } from '@domain/user/client/Client';

interface ClientDataModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

export default function ClientDataModal({ open, onClose, client }: ClientDataModalProps) {
    if (!client) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent dividers>
                <Typography className='title'>{client.name}</Typography>
                <Typography>Telefone: {client.phone}</Typography>
                <Typography>Rua: {client.street}</Typography>
                <Typography>Número: {client.houserNumber}</Typography>
                <Typography>Cidade: {client.city}</Typography>
                <Typography>Estado: {client.state}</Typography>
                <Typography>CEP: {client.zipCode}</Typography>
            </DialogContent>
        </Dialog>
    );
}
