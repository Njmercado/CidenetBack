import { findSourceMap } from 'module';
import { Countries, IDTypes } from '../enums/enums';
import { IEmployee } from '../interfaces/employee.interface'

export class EmployeeModel implements IEmployee {
    email?: string;
    firstname: string;
    surname: string;
    secondSurname: string;
    othersnames?: string | undefined;
    country: Countries;
    idType: IDTypes;
    
    constructor(
        firstname: string,
        surname: string,
        secondSurname: string,
        country: Countries,
        idType: IDTypes,
        othersnames?: string | undefined,
        email?: string,
    ) {
        this.email = email;
        this.firstname = firstname;
        this.surname = surname;
        this.secondSurname = secondSurname;
        this.othersnames = othersnames;
        this.country = country;
        this.idType = idType;
    }
}