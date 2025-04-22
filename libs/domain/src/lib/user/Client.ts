import { User } from '@domain/user';
import { EMPTY } from '@utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

export class Client extends User {
	constructor(
		public readonly id: string = uuidv4(),
		public name: string = EMPTY,
		public phone: string = EMPTY,
		public email: string = EMPTY,
        public street: string = EMPTY,
		public status: Status = Status.INACTIVE,
		public houserNumber: string = EMPTY,
		public city: string = EMPTY,
		public state: string = EMPTY,
		public zipCode: string = EMPTY,
		public country: string = EMPTY,
	) {
		super(id, name, phone, email);
	}
}

export enum Status {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	PENDING = "PENDING",
	SUSPENDED = "SUSPENDED",
	CANCELED = "CANCELED",
	COMPLETED = "COMPLETED"
  }