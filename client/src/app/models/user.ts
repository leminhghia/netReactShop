export interface IUser {
    email: string;
    roles: string[];
}

export interface IAddress {
    name: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}