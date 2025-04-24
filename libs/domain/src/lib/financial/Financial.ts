import { ServiceOrder } from '@domain/service-order';
import { CollaboratorSummary } from '@domain/user';
import { v4 as uuidv4 } from 'uuid';

export class Financial {
    constructor(
        public readonly id: string = uuidv4(),
        public serviceOrder: ServiceOrder = new ServiceOrder(),
        public collaborator: CollaboratorSummary = new CollaboratorSummary(),
        public income: number = 0,
        public expense: number = 0,
        public createdAt: string = new Date().toISOString()
    ) { }

    get balance(): number {
        return this.income - this.expense;
    }

    static fromJson(json: any): Financial {
        return new Financial(
            json.id,
            ServiceOrder.fromJson(json.serviceOrder),
            CollaboratorSummary.fromJson(json.collaborator),
            json.income,
            json.expense,
            json.createdAt
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            serviceOrder: this.serviceOrder,
            collaborator: this.collaborator,
            income: this.income,
            expense: this.expense,
            createdAt: this.createdAt,
        };
    }
}
