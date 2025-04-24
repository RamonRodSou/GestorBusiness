import './financial-graph.scss'
import { Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FinancialGraph() {

    const dataFinancial = [
        { month: 'Jan', cash: 3200, outflow: 800 },
        { month: 'Fev', cash: 3500, outflow: 900 },
        { month: 'Mar', cash: 4000, outflow: 1000 },
        { month: 'Abr', cash: 4500, outflow: 850 },
        { month: 'Mai', cash: 4800, outflow: 950 },
        { month: 'Jun', cash: 5000, outflow: 1000 },
        { month: 'Jul', cash: 5200, outflow: 1050 },
        { month: 'Ago', cash: 5240, outflow: 900 },
        { month: 'Set', cash: 5400, outflow: 1100 },
        { month: 'Out', cash: 5600, outflow: 1200 },
        { month: 'Nov', cash: 5900, outflow: 1150 },
        { month: 'Dez', cash: 6200, outflow: 1000 },
    ];
    
    return (
        <>
            <Typography variant="h5" gutterBottom className='title-secondary'>📈 Finanças do Ano</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataFinancial}>
                    <Line type="monotone" dataKey="cash" stroke="#4caf50" strokeWidth={3} name="Saldo"/>
                    <Line type="monotone" dataKey="outflow" stroke="#f44336" strokeWidth={3} name="Saídas"/>
                    <CartesianGrid stroke="#ccc"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>

        </>
    )
}