import { EMPTY } from '@utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

export abstract class User {
  constructor(
      public readonly id: string = uuidv4(),
      public name: string = EMPTY,
      public phone: string = EMPTY,
      public email: string = EMPTY,
    ) { }
}

export class UserSummary {
  constructor(
      public readonly id: string = uuidv4(),
      public email: string = EMPTY,
    ) { }
}
