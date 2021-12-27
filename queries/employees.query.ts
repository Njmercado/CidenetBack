import {IEmployee} from '../model/interfaces/employee.interface';
import Employee from '../model/schemas/employee.schema';
import { ExceptionResponseModel, EmployeesResponseModel, BooleanResponseModel, IResponseModel, EmployeeResponseModel } from '../model/models/response.model';

export const PaginateEmployees = async (page: number = 0, documents: number = 10): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, rejects: any) => {
        Employee
            .find({})
            .skip(page)
            .limit(documents)
            .exec((error, result: Array<IEmployee>) => {
                if(error) {
                    console.error("ERROR IN PAGINATEEMPLOYEES IN EMPLOYEES QUERY: ", error)
                    return rejects(new BooleanResponseModel(true, error.toString()))
                }
                return resolve(new EmployeesResponseModel(false, result))
        });
    })
}

export const InsertOneEmployee = async (employee: IEmployee): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve, reject) => {
        const employeeModel = new Employee({
            _id: employee._id,
            email: employee.email,
            firstname: employee.firstname,
            surname: employee.surname,
            secondSurname: employee.secondSurname,
            othersnames: employee.othersnames,
            country: employee.country,
            area: employee.area,
            admissionDate: employee.admissionDate,
            registerDate: employee.registerDate,
            idType: employee.idType
        })

        try {
            employeeModel.save((error,result) => {
                if(error) {
                    console.error("ERROR SAVING EMPLOYEE IN INSERTONEEMPLOYEE IN EMPLOYEES QUERY: ", error)
                    return reject(new BooleanResponseModel(true, error.toString()))
                } else {
                    return resolve(new BooleanResponseModel(false, ""))
                }
            })
        } catch(e) {
            console.log("Error: ", e)
            reject(new ExceptionResponseModel(true, e))
        }
    });
}

export const GetLastEmployeeInsertedWithEmail = async (email: String | RegExp): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, reject: any) => {
        Employee
        .find({email: email})
        .limit(1)
        .sort({$natural: -1})
        .exec((error, result: Array<IEmployee>) => {
            if(error) {
                console.error("ERROR IN GETLASTEMPLOYEEINSERTEDWITHEMAIL IN EMPLOYEES QUERY: ", error)
                return reject(new BooleanResponseModel(true, error.toString()))
            }
            return resolve(new EmployeesResponseModel(false, result))           
        });
    })
}

export const UpdateOneEmployee = async (employee: IEmployee): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, reject: any) => {
        Employee
            .findById(employee._id)
            .then( async (result: any) => {
                if(result == null) reject(new BooleanResponseModel(true, "Not found"))
                else{
                    result.firstname = employee.firstname;
                    result.surname = employee.surname;
                    result.secondSurname = employee.secondSurname;
                    result.othersnames = employee.othersnames;
                    result.country = employee.country;
                    result.idType = employee.idType;
                    result.area = employee.area;
                    result.email = employee.email;

                    try{
                        result.save((error: any, result: any) => {
                            if(error) {
                                console.error("ERROR IN UPDATEONEEMPLOYEE IN EMPLOYEES QUERY: ", error)
                                return reject(new BooleanResponseModel(true, error.toString()))
                            } else {
                                return resolve(new BooleanResponseModel(false, ""))
                            }
                        });
                    } catch(e) {
                        return reject(new ExceptionResponseModel(true, e))
                    }
                }
            })
    })
}

export const FindOneEmployeeByID = async (idNumber: string): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, reject: any) => {
        Employee
            .findById(idNumber)
            .then(async (result: any) => {
                if(result == null) {
                    console.error("ERROR IN FINDONEEMPLOYEEBYID IN EMPLOYEES QUERY: ", result)
                    return reject(new BooleanResponseModel(true, "Not found"))
                }
                else return resolve(new EmployeeResponseModel(false, result))
            })
            .catch(error => {
                return reject(new BooleanResponseModel(true, error))
            })
    })
}