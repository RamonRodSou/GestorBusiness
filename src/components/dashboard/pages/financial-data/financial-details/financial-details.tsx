import BackButton from "@components/back-button/BackButton";
import { Financial } from "@domain/financial";
import { Box, Button, Container, TextField } from "@mui/material";
import { financialAdd } from "@service/FinancialService";
import { useState } from "react";

export default function FinancialDetails() {
    const [financial, setFinancial] = useState<Financial>(new Financial());

    const handleChange = (field: keyof Financial, value: string | number) => {
        setFinancial(prev => {
            const updated = { ...prev, [field]: value };
            return Financial.fromJson(updated);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await financialAdd(financial);
        setFinancial(new Financial());
    };

    return (
        <>
            <BackButton path={'financial'} />
            <Container className='details-container'>
                <form onSubmit={handleSubmit} className="details-form">
                    <h2>Nova Movimentação</h2>

                    <Box mb={2}>
                        <TextField
                            label="Ordem de Serviço"
                            value={financial.serviceOrderId}
                            onChange={(e) => handleChange("serviceOrderId", e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Entrada (R$)"
                            type="number"
                            value={financial.income}
                            onChange={(e) => handleChange("income", parseFloat(e.target.value))}
                            fullWidth
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Saída (R$)"
                            type="number"
                            value={financial.expense}
                            onChange={(e) => handleChange("expense", parseFloat(e.target.value))}
                            fullWidth
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Salvar
                    </Button>
                </form>
            </Container>
        </>
    );
}
