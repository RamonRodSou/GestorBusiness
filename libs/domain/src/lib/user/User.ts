import { EMPTY } from '@utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

export abstract class User {
  constructor(
		public readonly id: string = uuidv4(),
		public name: string = EMPTY,
		public phone: string = EMPTY,
		public email: string = EMPTY,
    	public street: string = EMPTY,
		public houseNumber: string = EMPTY,
		public city: string = EMPTY,
		public state: string = EMPTY,
		public zipCode: string = EMPTY,
		public country: string = EMPTY,
    public createdAt: string = new Date().toISOString()
    ) { }
}

export class UserSummary {
  constructor(
      public readonly id: string = uuidv4(),
	  public name: string = EMPTY,
	  public phone: string = EMPTY,
      public email: string = EMPTY,
) { }
}
