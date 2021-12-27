import { CountryEnum, IDTypeEnum, StateEnum, AreaEnum } from '../enums/enums';
import { IEmployee } from '../interfaces/employee.interface'

export class EmployeeModel implements IEmployee {
    email?: string;
    firstname: string;
    surname: string;
    secondSurname: string;
    othersnames?: string | undefined;
    country: CountryEnum;
    idType: IDTypeEnum;
    admissionDate: Date;
    area: AreaEnum;
    registerDate: Date;
    
    constructor(
        firstname: string,
        surname: string,
        secondSurname: string,
        country: CountryEnum,
        idType: IDTypeEnum,
        area: AreaEnum,
        admissionDate: Date,
        registerDate: Date,
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
        this.admissionDate = admissionDate;
        this.registerDate = registerDate;
        this.area = area;
    }
}