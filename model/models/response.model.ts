import { IEmployee } from '../interfaces/employee.interface'

export interface IResponseModel {
    Error: Boolean
    Data?: any
    Message?: String
}

export class EmployeesResponseModel implements IResponseModel {
    Error: Boolean;
    Data: Array<IEmployee>;
    Message: String

    constructor(Error: Boolean, Data: Array<IEmployee>, Message: String = "") {
        this.Error = Error;
        this.Data = Data;
        this.Message = Message;
    }
}

export class EmployeeResponseModel implements IResponseModel {
    Error: Boolean;
    Data: IEmployee;
    Message: String

    constructor(Error: Boolean, Data: IEmployee, Message: String = "") {
        this.Error = Error;
        this.Data = Data;
        this.Message = Message;
    }
}

export class BooleanResponseModel implements IResponseModel {
    Error: Boolean;
    Message: String

    constructor(Error: Boolean, Message: String) {
        this.Error = Error;
        this.Message = Message;
    }
}

export class ExceptionResponseModel implements IResponseModel {
    Error: Boolean;
    Message: any

    constructor(Error: Boolean, Message: any) {
        this.Error = Error;
        this.Message = Message;
    }
}