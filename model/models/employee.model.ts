import { CountryEnum, IDTypeEnum, StateEnum, AreaEnum } from '../enums/enums';
import { IEmployee } from '../interfaces/employee.interface'

export class EmployeeModel implements IEmployee {
    _id?: string;
    idNumber?: string;
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
        idNumber: string,
        area?: AreaEnum,
        othersnames?: string | undefined,
        email?: string,
        _id?: string
    ) {
        this._id = _id;
        this.idNumber = idNumber;
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
    idNumber?: string | undefined;
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
        _id: string,
        idNumber: string,
        firstname: string,
        surname: string,
        secondSurname: string,
        country: number,
        idType: number,
        area: number,
        email: string,
        othersnames?: string | undefined,
    ) {
        this._id = _id;
        this.idNumber = idNumber;
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