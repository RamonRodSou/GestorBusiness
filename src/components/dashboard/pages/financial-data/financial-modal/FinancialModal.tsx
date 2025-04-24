import './financial-modal.scss';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function FinancialModal({ open, onClose, onConfirm, incomeDefault }: {
    open: boolean;
    onClose: () => void;
    onConfirm: (income: number, expense: number) => void;
    incomeDefault: number;
}) {
    const [income, setIncome] = useState(incomeDefault);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        setIncome(incomeDefault);
        setExpense(0);
    }, [incomeDefault, open]);

    return (
        <Dialog className='dialog-box' open={open} onClose={onClose}>
            <DialogTitle className='title'>Finalizar Ordem de Serviço</DialogTitle>
            <DialogContent className="dialog-content">
                <TextField
                    className="input-field"
                    fullWidth
                    label="Valor recebido (R$)"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(parseFloat(e.target.value))}
                    margin="dense"
                />
                <TextField
                    className="input-field"
                    fullWidth
                    label="Despesas (R$)"
                    type="number"
                    value={expense}
                    onChange={(e) => setExpense(parseFloat(e.target.value))}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions className="dialog-actions">
                <Button className="btn-cancel" onClick={onClose}>Cancelar</Button>
                <Button className="btn-confirm" onClick={() => onConfirm(income, expense)} variant="contained" color="primary">Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
}
