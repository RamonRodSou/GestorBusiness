import { User, UserSummary } from '@domain/user';
import { EMPTY } from '@utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

export class Client extends User {
	constructor(
		public readonly id: string = uuidv4(),
		public name: string = EMPTY,
		public phone: string = EMPTY,
		public email: string = EMPTY,
        public street: string = EMPTY,
		public houserNumber: string = EMPTY,
		public city: string = EMPTY,
		public state: string = EMPTY,
		public zipCode: string = EMPTY,
		public country: string = EMPTY,
		public createdAt: string = new Date().toISOString()
	) {
		super(id, name, phone, email, street, houserNumber, city, state, zipCode, country, createdAt);
	}

	static fromJson(json: any): Client {
        return new Client(
            json.id,
            json.name,
            json.email,
            json.phone,
            json.street,
            json.houserNumber,
            json.city,
            json.state,
            json.zipCode,
            json.country,
            json.createdAt
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            street: this.street,
            houserNumber: this.houserNumber,
            city: this.city,
            state: this.state,
            zipCode: this.zipCode,
            country: this.country,
            createdAt: this.createdAt,
        };
    }
}

export class ClientSummary extends UserSummary {
	constructor(
		public readonly id: string = uuidv4(),
		public name: string = EMPTY,
		public phone: string = EMPTY,
		public email: string = EMPTY,
	) {
		super(id, name, phone, email);
	}

	static fromJson(json: any): ClientSummary {
        return new ClientSummary(
            json.id,
            json.name,
            json.email,
            json.phone
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone
        };
    }
}
