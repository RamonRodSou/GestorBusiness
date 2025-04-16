// @domain/admin.ts
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
        public address: string = EMPTY
    ) {
        super(id, name, phone, email, password, address);
    }

    static fromJson(json: any): Admin {
        return new Admin(
            json.id,
            json.name,
            json.phone,
            json.email,
            json.password,
            json.address
        );
    }

    with(changes: Partial<Admin>): Admin {
        return new Admin(
            changes.id ?? this.id,
            changes.name ?? this.name,
            changes.phone ?? this.phone,
            changes.email ?? this.email,
            changes.password ?? this.password,
            changes.address ?? this.address
        );
    }
}

export class AdminSummary extends UserSummary {
    constructor(
        public readonly id: string = uuidv4(),
        public email: string = EMPTY,
        public password: string = EMPTY
    ) {
        super(id, email, password);
    }

    static fromJson(json: any): AdminSummary {
        return new AdminSummary(
            json.id,
            json.email,
            json.password
        );
    }

    with(changes: Partial<AdminSummary>): AdminSummary {
        return new AdminSummary(
            changes.id ?? this.id,
            changes.email ?? this.email,
            changes.password ?? this.password
        );
    }
}
