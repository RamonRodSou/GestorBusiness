import { EMPTY } from '@utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

export class Financial {
    constructor(
        public readonly id: string = uuidv4(),
        public serviceOrderId: string = EMPTY,
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
            json.serviceOrderId,
            json.income,
            json.expense,
            json.createdAt
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            serviceOrderId: this.serviceOrderId,
            income: this.income,
            expense: this.expense,
            createdAt: this.createdAt,
        };
    }
}
