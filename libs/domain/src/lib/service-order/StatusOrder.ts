export class StatusOrder {
    public static readonly PENDING = new StatusOrder('PENDING', 'Pendente', '#FFA500');
    public static readonly IN_PROGRESS = new StatusOrder('IN_PROGRESS', 'Em andamento', '#1E90FF');
    public static readonly CANCELED = new StatusOrder('CANCELED', 'Cancelada', '#FF6347');
    public static readonly COMPLETED = new StatusOrder('COMPLETED', 'Finalizado', '#32CD32');

    private constructor(
        public readonly status: string,
        public readonly label: string,
        public readonly color: string
    ) {}

    public static get(): StatusOrder[] {
        return [
            StatusOrder.PENDING,
            StatusOrder.IN_PROGRESS,
            StatusOrder.CANCELED,
            StatusOrder.COMPLETED
        ];
    }

    public static fromStatus(status: string): StatusOrder | undefined {
        return this.get().find((s) => s.status === status);
    }

    public static getStatusColorAndLabel(status: string): { label: string, color: string } {
        switch (status) {
            case StatusOrder.PENDING.status:
                return { label: 'Pendente', color: '#FFA500' };
            case  StatusOrder.IN_PROGRESS.status:
                return { label: 'Em andamento', color: '#007BFF' };
            case  StatusOrder.COMPLETED.status:
                return { label: 'Finalizado', color: '#28a745' };
            case  StatusOrder.CANCELED.status:
                return { label: 'Cancelado', color: '#dc3545' };
            default:
                return { label: 'Desconhecido', color: '#6c757d' };
        }
    }

}
