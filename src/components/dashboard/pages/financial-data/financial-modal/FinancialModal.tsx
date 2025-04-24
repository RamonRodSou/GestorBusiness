import { ServiceOrder } from '@domain/service-order';
import './financial-modal.scss';
import { Dialog, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function FinancialModal({ open, onClose, onConfirm, incomeDefault, order }: {
    open: boolean;
    onClose: () => void;
    onConfirm: (income: number, expense: number) => void;
    incomeDefault: number;
    order: ServiceOrder
}) {
    const [income, setIncome] = useState(incomeDefault);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        setIncome(incomeDefault);
        setExpense(0);
    }, [incomeDefault, open]);

    return (
        <Dialog className='dialog-box' open={open} onClose={onClose}>
            <div className='dialog-header'>
                <Typography className='dialog-title'>Finalizar Ordem de Serviço</Typography>
                <Typography variant="h6" className='title-number'>Ordem Nº {order.orderNumber}</Typography>
            </div>
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
