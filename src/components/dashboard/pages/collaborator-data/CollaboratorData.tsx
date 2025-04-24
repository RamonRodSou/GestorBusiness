import { Add } from "@mui/icons-material";
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
                    <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell className='title-secondary'>Nome</TableCell>
                            <TableCell className='title-secondary'>Telefone</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {filtered.map((it) => (
                            <TableRow key={it.id}>
                            <TableCell className='data-text'>{it.name}</TableCell>
                            <TableCell className='data-text'>{it.phone}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
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
