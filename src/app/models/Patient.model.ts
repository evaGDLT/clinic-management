import { Address } from '../interfaces/Address.interface';
import { Issurance } from '../interfaces/Issurance.interface';
export interface Patient{
    id?: number;
    type: string;
    personalData: {
        NHC?: string;
        firstName: string;
        lastName: string;
        secondLastName?: string;
        gender?: string;
        birthdate?: string;
        NIF: string;
    };
    address: Address;
    issurances: Issurance[];
}