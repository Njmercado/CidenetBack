export class EmployeesFilters {

    _id?: String | RegExp;
    email?: String | RegExp;
    firstname?: String | RegExp;
    surname?: String | RegExp;
    secondSurname?: String | RegExp;
    country?: String | RegExp;
    idType: Number;
    area: Number;
    state: Number;

    constructor(
        _id?: string,
        email?: string,
        firstname?: string,
        surname?: string,
        secondSurname?: string,
        country?: string,
        idType: number = -1,
        area: number = -1,
        state: number = -1
    ) {
        this._id = _id;
        this.email = email;
        this.firstname = firstname;
        this.surname = surname;
        this.secondSurname = secondSurname;
        this.country = country;
        this.idType = idType;
        this.area = area;
        this.state = state;
    }

    getFiltersAsJson() {

        let jsonObj: any = {}

        if(this.country) jsonObj["country"] = this.country || /.*/
        if(this.idType !== -1) jsonObj["idType"] = this.idType
        if(this.area !== -1) jsonObj["area"] = this.area
        if(this._id) jsonObj["_id"] = this._id || /.*/
        if(this.email) jsonObj["email"] = this.email || /.*/
        if(this.firstname) jsonObj["firstname"] = this.firstname || /.*/
        if(this.surname) jsonObj["surname"] = this.surname || /.*/
        if(this.secondSurname) jsonObj["secondSurname"] = this.secondSurname || /.*/

        return jsonObj;
    }
}