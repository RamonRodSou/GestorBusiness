import { JSX } from "@emotion/react/jsx-runtime";
import {
    AccountCircle,
    Assessment,
    Settings,
    People,
    Assignment,
  } from '@mui/icons-material';

interface IMenu {
    path: string;
    label: string;
    icon: JSX.Element;
}

export const menuItems: IMenu[] = [
    {
        path: 'home',
        label: 'Início',
        icon: <AccountCircle/>
    },
    {
        path: 'clients',
        label: 'Clientes',
        icon: <People/>,
    },
    {
        path: 'financial',
        label: 'Finanças',
        icon: <Assessment/>
    },
    {
        path: 'service-order',
        label: 'Ordens de Serviço',
        icon: <Assignment/>
    },
    {
        path: 'preferences',
        label: 'Configurações',
        icon: <Settings/>
    }
];
