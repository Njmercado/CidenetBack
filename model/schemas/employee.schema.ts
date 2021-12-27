import {
  Countries,
  IDTypes
} from '../enums/enums';

import { IEmployee } from '../interfaces/employee.interface'
import  mongoose from '../mongoose'

const IDTypesValues = Object.values(IDTypes);
const IDTypesLength = IDTypesValues.length / 2

const CountriesValues = Object.values(Countries);
const CountriesLength = CountriesValues.length / 2;

const EmployeeSchema = new mongoose.Schema<IEmployee>(
  {
    email: {
      type: String,
      required: [true, 'Ningún correo ha sido ingresado']
    },
    firstname: {
      type: String,
      required: [true, 'Primer nombre es obligatorio']
    },
    surname: {
      type: String,
      required: [true, 'Primer apellido es obligatorio']
    },
    secondSurname: {
      type: String,
      required: [true, 'Segundo apellido es obligatorio']
    },
    othersnames: {
      type: String
    },
    country:  {
      type: String,
      enum: CountriesValues.slice( CountriesLength, -1),
      required: [true, 'País es obligatorio']
    },
    idType: {
      type: Number,
      enum: IDTypesValues.slice(IDTypesLength, -1),
      required: [true, 'Tipo de Identificación es obligatorio']
    }
  }
)

const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema, 'Employee');
export default EmployeeModel;
