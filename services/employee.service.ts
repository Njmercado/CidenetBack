import { IEmployee } from '../model/interfaces/employee.interface'
import { IResponseModel, EmployeeResponseModel, BooleanResponseModel } from '../model/models/response.model'
import { 
    PaginateEmployees,
    GetLastEmployeeInsertedWithEmail,
    InsertOneEmployee, UpdateOneEmployee,
    FindOneEmployeeByID,
    DeleteOneEmployee,
    FindOneEmployeeByIDNumber
} from '../queries/employees.query';
import { GenerateEmailTemplateFromName, GetNextEmailID } from '../utils/employee.utils'
import { EmailModel } from '../utils/email.utils';
import { EmployeesFilters } from '../utils/filters.utils';

export const FindAll = async (page: number = 0, documents: number = 10, filters: EmployeesFilters): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, reject: any) => {
        PaginateEmployees(page, documents, filters)
        .then( (result: IResponseModel) => {
            if(result.Error) {
                return reject(result)
            }
            return resolve(result)
        });
    })
};

export const InsertOne = async (employee: IEmployee): Promise<IResponseModel> => {
    return new Promise<IResponseModel>( async (resolve: any, reject: any) => {

        try{

            const exist = await FindOneEmployeeByIDNumber(employee.idNumber as string)

            if(!exist.Error && exist.Data.length > 0) {
                return reject(new BooleanResponseModel(true, "Este usuario ya existe", 400))
            }

            const result = await GenerateEmail(employee);

            if(!result.Error) {
                //En  caso de no haber error guardo el empleado
                InsertOneEmployee(employee)
                .then( (result: IResponseModel) => {
                    if(result.Error)
                        return reject(result)
                    else
                        return resolve(result)
                })
                .catch(error => {
                    return reject(error)
                });
            } else {
                return reject(result)
            }
        } catch(e) {
            return reject(new BooleanResponseModel(true, "Error guardando empleado", 400))
        }
    })
}

export const UpdateOne = async (employee: IEmployee): Promise<IResponseModel> => {
    return new Promise<IResponseModel>(async (resolve: any, reject: any) => {

        const employeeResult = await FindOneEmployeeByID(employee._id as string);
        const employeeResultData = employeeResult.Data;

        if(
            employeeResultData.email != employee.email
        ) {
            return reject(new BooleanResponseModel(true, "No cuentas con los permisos para cambiar el correo"))
        }

        if(
            employeeResultData.firstname != employee.firstname || 
            employeeResultData.surname != employee.surname 
        ) {
            const resultEmail = await GenerateEmail(employee);
            if(!resultEmail.Error) {
                employee.email = resultEmail.Data.email;
            }
        }

        UpdateOneEmployee(employee)
        .then( (result: IResponseModel) => {
            if(result.Error)
                return reject(result)
            else
                return resolve(result)
        })
        .catch(error => {
            return reject(error);
        });
    })
}

export const DeleteOne = async (_id: string): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, reject: any) => {
        
        DeleteOneEmployee(_id)
        .then((result: IResponseModel) => {
            if(result.Error) return reject(result);
            else return resolve(result);
        })
        .catch(e => {
            return resolve(e);
        })
    })
}

const GenerateEmail = async (employee: IEmployee): Promise<IResponseModel> => {

    return new Promise<IResponseModel>(async (resolve: any, reject: any) => {
        try{
            const emailTemplate: EmailModel = GenerateEmailTemplateFromName(employee);
            const lastEmployeeResponse = await GetLastEmployeeInsertedWithEmail(emailTemplate.getRegexEmail());

            if(!lastEmployeeResponse.Error) {
                const lastEmail = lastEmployeeResponse.Data[0]?.email || null;

                if(lastEmail){ // Si ya hay un empleado registrado obtengo el siguiente id del email
                    emailTemplate.ID = GetNextEmailID(lastEmail);
                }
                employee.email = emailTemplate.getCompleteEmail();
                resolve(new EmployeeResponseModel(false, employee))
            } else {
                reject(new BooleanResponseModel(true, ""))
            }
        } catch(e) {
            reject(new BooleanResponseModel(true, e as string, 500))
        }
    })
}