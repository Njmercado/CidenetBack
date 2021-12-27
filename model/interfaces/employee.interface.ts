import {
    Countries,
    IDTypes
} from '../enums/enums';

export interface IEmployee {
    email?: string,
    firstname: string,
    surname: string,
    secondSurname: string,
    othersnames?: string,
    country: Countries,
    idType: IDTypes
}