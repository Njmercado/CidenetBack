import { CountryEnum, IDTypeEnum, StateEnum, AreaEnum } from '../enums/enums';
import { IEmployee } from '../interfaces/employee.interface'

export class EmployeeModel implements IEmployee {
    _id?: string;
    email?: string;
    firstname: string;
    surname: string;
    secondSurname: string;
    othersnames?: string | undefined;
    country: CountryEnum;
    idType: IDTypeEnum;
    admissionDate: Date;
    area?: AreaEnum;
    registerDate: Date;
    
    constructor(
        firstname: string,
        surname: string,
        secondSurname: string,
        country: CountryEnum,
        idType: IDTypeEnum,
        admissionDate: Date,
        idNumber?: string,
        area?: AreaEnum,
        othersnames?: string | undefined,
        email?: string,
    ) {
        this._id = idNumber;
        this.email = email;
        this.firstname = firstname;
        this.surname = surname;
        this.secondSurname = secondSurname;
        this.othersnames = othersnames;
        this.country = country;
        this.idType = idType;
        this.admissionDate = admissionDate;
        this.registerDate = new Date();
        this.area = area;
    }
}

export class UpdateEmployeeModel implements IEmployee {
    _id?: string | undefined;
    firstname: string;
    surname: string;
    secondSurname: string;
    othersnames?: string | undefined;
    country: CountryEnum;
    idType: IDTypeEnum;
    area: AreaEnum | undefined;
    updateDate: Date | undefined;
    email: string;

    constructor(
        idNumber: string,
        firstname: string,
        surname: string,
        secondSurname: string,
        country: CountryEnum,
        idType: IDTypeEnum,
        area: AreaEnum,
        email: string,
        othersnames?: string | undefined,
    ) {
        this._id = idNumber;
        this.firstname = firstname as string;
        this.surname = surname;
        this.secondSurname = secondSurname;
        this.country = country;
        this.idType = idType;
        this.area = area;
        this.othersnames = othersnames;
        this.updateDate = new Date();
        this.email = email;
    }
}