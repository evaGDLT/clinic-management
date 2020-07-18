type issurance = 'salud' | 'familiar' | 'dental';
export interface Issurance {
    cardNumber: number;
    name: string;
    type: issurance;
}