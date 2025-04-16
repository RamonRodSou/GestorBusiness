import { User } from '@user/User';
import { EMPTY } from '@utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

export class Client extends User {
	public service: ServiceWorker[] = [];

	constructor(
		public readonly id: string = uuidv4(),
		public name: string = EMPTY,
		public phone: string = EMPTY,
		public email: string = EMPTY,
		public password: string = EMPTY,
		public address: string = EMPTY
	) {
		super(id, name, phone, email, password, address);
	}

	setService(service: ServiceWorker) {
		this.service.push(service);
	}
}
