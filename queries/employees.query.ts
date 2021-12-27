import {IEmployee} from '../model/interfaces/employee.interface';
import Employee from '../model/schemas/employee.schema';
import { ExceptionResponseModel, EmployeesResponseModel, BooleanResponseModel, IResponseModel } from '../model/models/response.model';

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
                    reject(new BooleanResponseModel(true, error.toString()))
                } else {
                    resolve(new BooleanResponseModel(false, ""))
                }
            })
        } catch(e) {
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
