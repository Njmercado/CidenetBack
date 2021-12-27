import { IEmployee } from '../model/interfaces/employee.interface'
import { IResponseModel } from '../model/models/response.model'
import { PaginateEmployees, GetLastEmployeeInsertedWithEmail, InsertOneEmployee } from '../queries/employees.query';
import { GenerateEmailTemplateFromName, GetNextEmailID } from '../utils/employee.utils'
import { EmailModel } from '../utils/email.utils';

export const FindAll = async (page: number = 0, documents: number = 10): Promise<IResponseModel> => {
    return new Promise<IResponseModel>((resolve: any, reject: any) => {
        PaginateEmployees(page, documents)
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
        const emailTemplate: EmailModel = GenerateEmailTemplateFromName(employee);
        const lastEmployeeResponse = await GetLastEmployeeInsertedWithEmail(emailTemplate.getRegexEmail());

        if(!lastEmployeeResponse.Error) {
            const lastEmail = lastEmployeeResponse.Data[0]?.email || null;

            if(lastEmail){ // Si ya hay un empleado registrado obtengo el siguiente id del email
                emailTemplate.ID = GetNextEmailID(lastEmail);
            }
            employee.email = emailTemplate.getCompleteEmail();

            //En  caso de no haber error guardo el empleado
            InsertOneEmployee(employee)
            .then( (result: IResponseModel) => {
                if(result.Error)
                    return reject(result)
                else
                    return resolve(result)
            });
        }
    })
}