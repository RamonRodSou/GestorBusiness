import { Add } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '@components/search/Search';
import { Collaborator } from '@domain/user';
import { findAllCollaborators } from '@service/CollaboratorService';

export default function CollaboratorData() {
    const [data, setData] = useState<Collaborator[]>([]);
    const [filtered, setFiltered] = useState<Collaborator[]>([]);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        findAllCollaborators()
            .then((it) => {
                setData(it);
                setFiltered(it);
            })
            .catch(console.error);
    }, []);

    function newCollaborator() {
        return navigate(`/dashboard/${userId}/new-collaborator`);
    }

    return (
        <Container className='data-container'>
            <Search<Collaborator> data={data} onFilter={setFiltered} />

            {filtered?.length > 0 ? (
                filtered.map((it) => (
                    <Box className='data-list' key={it.id}>
                        <Typography className='data-text'>{it?.name}</Typography>
                        <Typography className='data-text'>{it?.phone}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body1" sx={{ color: 'var(--primary-title)' }}>
                    Nenhum colaborador encontrado.
                </Typography>
            )}

            <Tooltip className='data-button' title="Click to new collaborator">
                <IconButton onClick={() => newCollaborator()}>
                    <Add/>
                </IconButton>
            </Tooltip>
        </Container>
    );
}
