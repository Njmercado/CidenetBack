import {
    CountryEnum,
    IDTypeEnum,
    AreaEnum,
    StateEnum
} from '../enums/enums';

export interface IEmployee {
    email?: string,
    firstname: string,
    surname: string,
    secondSurname: string,
    othersnames?: string,
    country: CountryEnum,
    idType: IDTypeEnum,
    area: AreaEnum,
    state?: StateEnum,
    admissionDate?: Date,
    registerDate?: Date
}