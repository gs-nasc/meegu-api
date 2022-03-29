
export interface User {
    id?: number;
    name: string;
    birthdate: Date;
    acceptedTerms: boolean;
    document?: string;
    zipcode: number;
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    createdAt?: Date;
    updatedAt?: Date;   
}