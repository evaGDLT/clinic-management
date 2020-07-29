import { Address } from '../interfaces/Address.interface';
import { Issurance } from '../interfaces/Issurance.interface';
type professionalType= 'medico' | 'enfermero' | 'administrativo';
export interface Professional{
    id?: string;
    type: string;
    personalData: {
        medicalBoardNumber?: string;
        firstName: string;
        lastName: string;
        secondLastName?: string;
        gender?: string;
        birthdate?: string;
        NIF: string;
        professionalType: professionalType;
    };
    address: Address;
}