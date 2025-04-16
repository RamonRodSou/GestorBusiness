import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './AppRouter'
import { Container } from '@mui/material'

createRoot(document.getElementById('root')!).render(
    <Container>
        <StrictMode>
            <AppRouter/>
        </StrictMode>
    </Container>
)
