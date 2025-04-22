import './client-data.scss';
import { Add } from "@mui/icons-material";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { Client } from '@domain/user/Client';
import { findAllClients } from '@service/UserService';
import { ManagerContext } from '@context/ManagerContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClientData() {
    const [data, setData] = useState<Client[]>();
    const { userId } = useParams();
    const { isMobile } = useContext(ManagerContext);
    const navigate = useNavigate();

    function newClient() {
        return navigate(`/dashboard/${userId}/new-client`);
    }

    useEffect(() => {
        findAllClients()
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <Container className='container'>
            {data?.map((it) => (
                <Box className='list' key={it.id}>
                    <Typography className='text'>
                        {it?.name}
                    </Typography>
                    <Typography className='text'>
                        {it?.phone}
                    </Typography>
                    {isMobile 
                        ? <></> 
                        : <>
                            <Typography className='text'>
                                {it?.street}
                            </Typography>
                            <Typography className='text'>
                                {it?.houserNumber}
                            </Typography>
                            <Typography className='text'>
                                {it?.city}
                            </Typography>
                            <Typography className='text'>
                                {it?.state}
                            </Typography>
                           <Typography className='text'>
                                {it?.houserNumber}
                            </Typography>
                            <Typography className='text'>
                                {it?.zipCode}
                            </Typography>
                        </>
                    }
                    <Typography className='text'>
                        {it?.status}
                    </Typography>

                </Box>
            ))}

            <Tooltip className='button' title="Click to new client">
                <IconButton onClick={() => newClient()}>
                    <Add/>
                </IconButton>
            </Tooltip>
        </Container>
    )
}
