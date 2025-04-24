import { v4 as uuidv4 } from 'uuid';
import { EMPTY } from '@utils/string-utils';
import { Client, CollaboratorSummary } from '@domain/user';
import { StatusOrder } from './Status-Order';

export class ServiceOrder {
    public readonly id: string;
    public readonly orderNumber: number;
    public serviceValue: number = 0;

    constructor(
        public description: string = EMPTY,
        public client: Client = new Client(),
        public collaborator: CollaboratorSummary = new CollaboratorSummary(),
        public status: string = StatusOrder.PENDING.status,
        orderNumber: number = 1,
        serviceValue: number = 0,
        public createdAt: string = new Date().toISOString()
    ) {
        this.id = uuidv4();
        this.orderNumber = orderNumber;
        this.serviceValue = serviceValue;
    }

    static fromJson(json: any): ServiceOrder {
        const order = new ServiceOrder(
            json.description,
            Client.fromJson(json.Client),
            CollaboratorSummary.fromJson(json.collaborator),
            json.status.label,
            json.orderNumber || 1,
            json.serviceValue || 0,
            json.createdAt,
        );

        (order as any).id = json.id;
        return order;
    }

    toJSON(): object {
        return {
            id: this.id,
            orderNumber: this.orderNumber,
            description: this.description,
            client: this.client,
            collaborator: this.collaborator,
            status: this.status,
            serviceValue: this.serviceValue,
            createdAt: this.createdAt,
        };
    }
}