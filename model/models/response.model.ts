import { IEmployee } from '../interfaces/employee.interface'

export interface IResponseModel {
    Error: Boolean
    Data?: any
    Message?: String | Array<String>
    ResponseCode?: Number
}

export class EmployeesResponseModel implements IResponseModel {
    Error: Boolean;
    Data: Array<IEmployee>;
    Message: String
    ResponseCode?: Number

    constructor(Error: Boolean, Data: Array<IEmployee>, Message: String = "", ResponseCode: Number = 200) {
        this.Error = Error;
        this.Data = Data;
        this.Message = Message;
        this.ResponseCode = ResponseCode;
    }
}

export class EmployeeResponseModel implements IResponseModel {
    Error: Boolean;
    Data: IEmployee;
    Message: String
    ResponseCode?: Number

    constructor(Error: Boolean, Data: IEmployee, Message: String = "", ResponseCode: Number = 200) {
        this.Error = Error;
        this.Data = Data;
        this.Message = Message;
        this.ResponseCode = ResponseCode;
    }
}

export class BooleanResponseModel implements IResponseModel {
    Error: Boolean;
    Message: String | Array<String>
    ResponseCode?: Number

    constructor(Error: Boolean, Message: String | Array<String>, ResponseCode: Number = 200) {
        this.Error = Error;
        this.Message = Message;
        this.ResponseCode = ResponseCode;
    }
}

export class ExceptionResponseModel implements IResponseModel {
    Error: Boolean;
    Message: any
    ResponseCode?: Number

    constructor(Error: Boolean, Message: any, ResponseCode: Number = 200) {
        this.Error = Error;
        this.Message = Message;
        this.ResponseCode = ResponseCode;
    }
}