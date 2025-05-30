import { User, UserSummary } from "@domain/user";
import { EMPTY } from "@utils/string-utils";
import { v4 as uuidv4 } from 'uuid';

export class Admin extends User {
    constructor(
        public readonly id: string = uuidv4(),
        public name: string = EMPTY,
        public phone: string = EMPTY,
        public email: string = EMPTY,
        public password: string = EMPTY,
        public readonly permissions: string[] = []
    ) {
        super(id, name, phone, email);
    }

    static fromJson(json: any): Admin {
        return new Admin(
            json.id,
            json.name,
            json.phone,
            json.email,
            json.password,
            json.permissions || []
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            password: this.password,
            permissions: this.permissions
        };
    }

    hasPermission(permission: string): boolean {
        return this.permissions.includes(permission);
    }
}

export class AdminSummary extends UserSummary {
    constructor(
        public readonly id: string = uuidv4(),
        public email: string = EMPTY,
        public password: string = EMPTY
    ) {
        super(id, email);
    }

    static fromJson(json: any): AdminSummary {
        return new AdminSummary(
            json.id,
            json.email,
            json.password
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            email: this.email,
            password: this.password
        };
    }
}