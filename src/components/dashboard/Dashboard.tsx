import './dashboard.scss';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { AccountCircle, Assessment, Settings, People, Assignment } from '@mui/icons-material';

export default function Dashboard() {
    const { userId } = useParams<{ userId: string }>();

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box
              sx={{
                width: 240,
                bgcolor: 'primary.main',
                color: 'white',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                  Menu
              </Typography>
              <Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                      <AccountCircle sx={{ mr: 1 }} />
                      Início
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                      <People sx={{ mr: 1 }} />
                      Clientes
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                      <Assessment sx={{ mr: 1 }} />
                      Relatórios
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                      <Assignment sx={{ mr: 1 }} />
                      Ordens de Serviço
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                      <Settings sx={{ mr: 1 }} />
                      Configurações
                  </Typography>
                </Box>
            </Box>

            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Bem-vindo, Usuário {userId}
                </Typography>
            </Box>
        </Box>
    );
}
