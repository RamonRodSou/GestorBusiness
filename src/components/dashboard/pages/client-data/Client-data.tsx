import './client-data.scss';
import { Add } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { Client } from '@domain/user/Client';
import { findAllClients } from '@service/UserService';
import { ManagerContext } from '@context/ManagerContext';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '@components/search/Search';

export default function ClientData() {
    const [data, setData] = useState<Client[]>([]);
    const [filtered, setFiltered] = useState<Client[]>([]);
    const { userId } = useParams();
    const { isMobile } = useContext(ManagerContext);
    const navigate = useNavigate();

    useEffect(() => {
        findAllClients()
            .then((res) => {
                setData(res);
                setFiltered(res);
            })
            .catch(console.error);
    }, []);

    function newClient() {
        return navigate(`/dashboard/${userId}/new-client`);
    }

    return (
        <Container className='data-container'>
            <Search<Client> data={data} onFilter={setFiltered} />

            {filtered?.length > 0 ? (
                filtered.map((it) => (
                    <Box className='data-list' key={it.id}>
                        <Typography className='data-text'>{it?.name}</Typography>
                        <Typography className='data-text'>{it?.phone}</Typography>

                        {!isMobile && (
                            <>
                                <Typography className='data-text'>{it?.street}</Typography>
                                <Typography className='data-text'>{it?.houserNumber}</Typography>
                                <Typography className='data-text'>{it?.city}</Typography>
                                <Typography className='data-text'>{it?.state}</Typography>
                                <Typography className='data-text'>{it?.zipCode}</Typography>
                            </>
                        )}

                        <Typography className='data-text'>{it?.status}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body1" sx={{ color: 'var(--primary-title)' }}>
                    Nenhum cliente encontrado.
                </Typography>
            )}

            <Tooltip className='data-button' title="Click to new client">
                <IconButton onClick={() => newClient()}>
                <Add />
                </IconButton>
            </Tooltip>
        </Container>
    );
}
