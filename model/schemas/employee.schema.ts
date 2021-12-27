import {
  CountryEnum,
  IDTypeEnum,
  AreaEnum,
  StateEnum
} from '../enums/enums';

import { IEmployee } from '../interfaces/employee.interface'
import  mongoose from '../mongoose'

import { IsLessThanAMonth } from '../../utils/date.utils';

const IDTypesValues = Object.values(IDTypeEnum);
const IDTypesLength = IDTypesValues.length / 2

const CountriesValues = Object.values(CountryEnum);
const CountriesLength = CountriesValues.length / 2;

const AreaValues = Object.values(AreaEnum);
const AreasLength = AreaValues.length / 2;

const EmployeeSchema = new mongoose.Schema<IEmployee>(
  {
    email: {
      type: String,
      required: [true, 'Ningún correo ha sido ingresado']
    },
    firstname: {
      type: String,
      required: [true, 'Primer nombre es obligatorio'],
      validate: {
        validator: function(firstname: string) {
          return firstname === firstname.toUpperCase();
        },
        message: "El nombre debe estar en mayusculas"
      },
      maxlength: 300
    },
    surname: {
      type: String,
      required: [true, 'Primer apellido es obligatorio'],
      validate: {
        validator: function(firstname: string) {
          return firstname === firstname.toUpperCase();
        },
        message: "El primer apellido debe estar en mayusculas"
      },
      maxlength: 300
    },
    secondSurname: {
      type: String,
      required: [true, 'Segundo apellido es obligatorio'],
      validate: {
        validator: function(firstname: string) {
          return firstname === firstname.toUpperCase();
        },
        message: "El segundo apellido debe estar en mayusculas"
      },
      maxlength: 300
    },
    othersnames: {
      type: String,
      validate: {
        validator: function(firstname: string) {
          return firstname === firstname.toUpperCase();
        },
        message: "El campo de otros nombres debe estar en mayusculas"
      },
      maxlength: 300
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
    },
    admissionDate: {
      type: Date,
      required: [true, 'Fecha de ingreso es obligatoria'],
      validate: {
        validator: function(date: Date) {
          return IsLessThanAMonth(date)
        },
        message: "La fecha debe ser menor a un mes desde la fecha actual."
      }
    },
    registerDate: {
      type: Date,
      required: [true, 'Fecha de registro es obligatoria']
    },
    area: {
      type: Number,
      enum: AreaValues.slice(AreasLength, -1),
      required: [true, 'Area debe ser obligatoria']
    },
    state: {
      type: Number,
      default: StateEnum.ACTIVO
    }
  }
)

const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema, 'Employee');
export default EmployeeModel;
