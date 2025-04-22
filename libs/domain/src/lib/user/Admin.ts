import { EMPTY } from "@utils/string-utils";
import { User } from "./User";

export class Admin extends User {
    constructor(
        public name: string = EMPTY,
        public phone: string = EMPTY,
        public email: string = EMPTY,
        public password: string = EMPTY,
        public address: string = EMPTY
    ) {
        super();
    }
}