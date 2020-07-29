import { Address } from '../interfaces/Address.interface';
import { Issurance } from '../interfaces/Issurance.interface';
export interface Patient{
    _id?: string;
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