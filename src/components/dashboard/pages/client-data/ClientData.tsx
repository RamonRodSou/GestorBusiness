import './client-data.scss';
import { Add, Info } from "@mui/icons-material";
import {
    Container,
    IconButton,
    Tooltip,
    Typography,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper
} from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { Client } from '@domain/user/client/Client';
import { findAllClients } from '@service/UserService';
import { ManagerContext } from '@context/ManagerContext';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '@components/search/Search';
import ClientDataModal from './client-data-modal/ClientDataModa';
import SnackBarMessage from '@components/snackBarMessage/SnackBarMessage';

export default function ClientData() {
    const [data, setData] = useState<Client[]>([]);
    const [filtered, setFiltered] = useState<Client[]>([]);
    const [openData, setOpenData] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const { userId } = useParams();
    const { isMobile, openSnackbar, setOpenSnackbar } = useContext(ManagerContext);
    const navigate = useNavigate();
    
    function handleOpenDetails(client: Client) {
        setSelectedClient(client);
        setOpenData(true);
    }

    function newClient() {
        return navigate(`/dashboard/${userId}/new-client`);
    }

    useEffect(() => { 
        findAllClients()
            .then((it) => {
                setData(it);
                setFiltered(it);
            })
            .catch(console.error);
    }, []);

    return (
        <Container className="data-container">
            <Search<Client> data={data} onFilter={setFiltered} />
            {filtered?.length > 0 ? (
                <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell className='title-secondary'>Nome</TableCell>
                        <TableCell className='title-secondary'>Telefone</TableCell>
                        {!isMobile && (
                        <>
                            <TableCell className='title-secondary'>Rua</TableCell>
                            <TableCell className='title-secondary'>Número</TableCell>
                            <TableCell className='title-secondary'>Cidade</TableCell>
                            <TableCell className='title-secondary'>Estado</TableCell>
                            <TableCell className='title-secondary'>CEP</TableCell>
                        </>
                        )}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filtered.map((it) => (
                        <TableRow key={it.id}>
                        <TableCell className='data-text'>{it.name}</TableCell>
                        <TableCell className='data-text'>{it.phone}</TableCell>
                        {!isMobile && (
                            <>
                            <TableCell className='data-text'>{it.street}</TableCell>
                            <TableCell className='data-text'>{it.houserNumber}</TableCell>
                            <TableCell className='data-text'>{it.city}</TableCell>
                            <TableCell className='data-text'>{it.state}</TableCell>
                            <TableCell className='data-text'>{it.zipCode}</TableCell>
                            </>
                            
                        )}
                        <IconButton onClick={() => handleOpenDetails(it)}>
                            <Info/>
                        </IconButton>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" sx={{ color: 'var(--primary-title)' }}>
                Nenhum cliente encontrado.
                </Typography>
            )}

            <Tooltip className="data-button" title="Click to new client">
                <IconButton onClick={newClient}>
                    <Add/>
                </IconButton>
            </Tooltip>
            <ClientDataModal
                open={openData}
                onClose={() => setOpenData(false)}
                client={selectedClient}
            />
            <SnackBarMessage 
                message={"Cliente criado com sucesso!"} 
                openSnackbar={openSnackbar} 
                setOpenSnackbar={setOpenSnackbar}
            />
        </Container>

    );
}
