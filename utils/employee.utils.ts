import {IEmployee} from '../model/interfaces/employee.interface';
import {Countries, Hosts} from '../model/enums/enums';
import { EmailModel } from './email.utils'

//Retorna un template del correo de la persona. Tambien retorna un espacio para agregar el ID en caso de ser necesario
export const GenerateEmailTemplateFromName =  (employee: IEmployee): EmailModel => {
    const name = employee.firstname;

    const surname = employee.surname;
    const surnameWithoutSpaces = surname.split(" ").join("");

    let host = ''

    switch(employee.country) {
        case Countries.COLOMBIA:
            host = Hosts.COLOMBIA;
            break;
        case Countries.USA:
            host = Hosts.USA;
            break;
        default:
            return new EmailModel("", "")
    }

    return new EmailModel(
        `${name}.${surnameWithoutSpaces}`,
        host
    );
}

export const GetNextEmailID = (email: String): string => {
    const splittedEmail = email.split("@");
    const splittedUsername = splittedEmail[0].split(".")

    if(splittedUsername.length > 2) {

        const id = splittedUsername[2];
        const idAsNumber = Number.parseInt(id) + 1;
        return idAsNumber.toString();
    }
    return "1";
}