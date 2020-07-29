import { Address } from '../interfaces/Address.interface';
import { Issurance } from '../interfaces/Issurance.interface';
type professionalType= 'Medico' | 'Enfermero' | 'Administrativo';
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
        professional: professionalType;
    };
    address: Address;
}