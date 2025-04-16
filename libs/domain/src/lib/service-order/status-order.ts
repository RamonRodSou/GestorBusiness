export class StatusOrder {
    public static readonly PENDING = new StatusOrder('PENDING', 'Pendente');
    public static readonly SHIPPED = new StatusOrder('IN_PROGESS', 'Em andamento');
    public static readonly DELIVERED = new StatusOrder('COMPLETED', 'Finalizado');

    private constructor (
        public readonly status: string,
        public readonly label: string
    ) { }

    public static get(status: string) {
        const order = Object.values(StatusOrder)
            .find(it => 
                it.status === status
            );
            return order;
    }
}