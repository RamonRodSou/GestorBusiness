import { Client } from "@domain/user/client/Client";
import { findAllClients } from "@service/UserService";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { allMonth } from "../all-month";
import { Typography } from "@mui/material";
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from 'recharts';

export default function ClientGraph() {
    const [data, setData] = useState<Client[]>([]);
    const [clientData, setClientData] = useState<{ month: string, newClient: number }[]>([]);
    const monthCount: { [key: string]: number } = {};

        useEffect(() => {
            findAllClients()
                .then((it) => {
                    setData(it);
                    it.forEach(client => {
                        const month = format(new Date(client.createdAt), 'MMM', { locale: ptBR });
                        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        
                        monthCount[capitalizedMonth] 
                            ? monthCount[capitalizedMonth]++
                            : monthCount[capitalizedMonth] = 1;
                    });
        
                    const clientsPerMonth = allMonth.map((month) => ({
                        month,
                        newClient: monthCount[month] || 0
                    }));
        
                    setClientData(clientsPerMonth);
                });
        }, []);
    
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }} className='title-secondary'>👥 Movimento de Clientes</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clientData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="newClient" fill="#2196f3" name="Entradas"/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}