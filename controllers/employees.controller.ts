import {
  check,
  validationResult
} from 'express-validator';
import { FindAll, InsertOne, UpdateOne, DeleteOne } from '../services/employee.service'
import { Router, Request, Response, NextFunction } from 'express'
import { EmployeeModel, UpdateEmployeeModel } from '../model/models/employee.model';
import { EmployeesFilters } from '../utils/filters.utils';
import { IResponseModel } from '../model/models/response.model';
var router = Router();

router.post(
  '/',
  [
    check("email")
      .not().exists()
      .withMessage("No se puede ingresar el correo manualmente"),
    check("country")
      .not().isEmpty()
      .withMessage("El campo del País es obligatorio")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Pais debe ser tipo númerico"),
    check("idType")
      .not().isEmpty()
      .withMessage("El campo del Tipo de Documento es obligatorio")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Tipo de documento debe ser tipo númerico"),
    check("idNumber")
      .not().isEmpty()
      .withMessage("El campo del Número del Documento es obligatorio")
      .if((value: number) => value >= 0)
        .isString().withMessage("Número de documento debe ser tipo Alfa-Númerico"),
    check("area")
      .not().isEmpty()
      .withMessage("El campo del Area es obligatorio")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Area debe ser tipo númerico"),
    check("state")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Estado debe ser tipo númerico"),
    check("firstname")
      .not().isEmpty()
      .withMessage("El campo del Nombre es obligatorio")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El nombre debe contener solo letras")
        .isUppercase().withMessage("El Nombre solo debe contener letras en mayuscula"),
    check("surname")
      .not().isEmpty()
      .withMessage("El campo del Apellido es obligatorio")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El apellido debe contener solo letras")
        .isUppercase().withMessage("El Apellido solo debe contener letras en mayuscula"),
    check("secondSurname")
      .not().isEmpty()
      .withMessage("El campo del Segundo Apellido es obligatorio")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El segundo apellido debe contener solo letras")
        .isUppercase().withMessage("El Segundo Apellido solo debe contener letras en mayuscula"),
    check("othersnames")
      .if((value: string) => value.length > 0)
        .isString().withMessage("Otros nombres deben ser solo letras")
        .isUppercase().withMessage("Los Otros Nombres solo deben contener letras en mayuscula")
  ],
  async function(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(200).json({
        Error: true,
        Message: errors.array().map(error => error.msg)
      })
    }

    const employeeModel = new EmployeeModel(
      req.body.firstname,
      req.body.surname,
      req.body.secondSurname,
      req.body.country,
      req.body.idType,
      req.body.admissionDate,
      req.body.idNumber,
      req.body.area,
      req.body.othersnames
    );

    InsertOne(employeeModel)
    .then((result: IResponseModel) => {
      return res
        .status(result.ResponseCode as number)
        .json(result)
    })
    .catch(error => {
      return res
        .status(400)
        .json(error)
    })
  }
).get(
  '/',
  [
    check("email")
      .if((value: string) => value.length > 0)
        .isEmail().withMessage("Correo invalido"),
    check("country")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Pais debe ser tipo númerico"),
    check("idType")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Tipo de documento debe ser tipo númerico"),
    check("area")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Area debe ser tipo númerico"),
    check("state")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Estado debe ser tipo númerico"),
    check("firstname")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El nombre debe contener solo letras")
        .isUppercase().withMessage("Solo debe contener letras en mayuscula"),
    check("surname")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El apellido debe contener solo letras")
        .isUppercase().withMessage("Solo debe contener letras en mayuscula"),
    check("secondSurname")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El segundo apellido debe contener solo letras")
        .isUppercase().withMessage("Solo debe contener letras en mayuscula"),
    check("othersnames")
      .if((value: string) => value.length > 0)
        .isString().withMessage("Otros nombres deben ser solo letras")
        .isUppercase().withMessage("Solo debe contener letras en mayuscula")
  ],
  async function(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({
        Error: true,
        Message: errors.array().map(error => error.msg)
      });
    }

    const page = Number.parseInt(req.query["page"] as string);
    const documents = Number.parseInt(req.query["documents"] as string);

    const filters = new EmployeesFilters(
      req.query?.idNumber as string,
      req.query?.email as string,
      req.query.firstname as string,
      req.query.surname as string,
      req.query.secondSurname as string,
      req.query.country as string,
      Number.parseInt(req.query.idType as string) || -1,
      Number.parseInt(req.query.area as string) || -1,
      Number.parseInt(req.query.state as string) || -1,
    );

    const result = await FindAll(page, documents, filters);
    return res
      .status(200)
      .json(result);
  }
).put(
  '/', [
    check("country")
      .not().isEmpty()
      .withMessage("El campo del País es obligatorio")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Pais debe ser tipo númerico"),
    check("idType")
      .not().isEmpty()
      .withMessage("El campo del Tipo de Documento es obligatorio")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Tipo de documento debe ser tipo númerico"),
    check("idNumber")
      .not().isEmpty()
      .withMessage("El campo del Número del Documento es obligatorio")
      .if((value: number) => value >= 0)
        .isString().withMessage("Número de documento debe ser tipo Alfa-Númerico"),
    check("area")
      .not().isEmpty()
      .withMessage("El campo del Area es obligatorio")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Area debe ser tipo númerico"),
    check("state")
      .if((value: number) => value >= 0)
        .isNumeric().withMessage("Estado debe ser tipo númerico"),
    check("firstname")
      .not().isEmpty()
      .withMessage("El campo del Nombre es obligatorio")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El nombre debe contener solo letras")
        .isUppercase().withMessage("El nombre solo debe contener letras en mayuscula"),
    check("surname")
      .not().isEmpty()
      .withMessage("El campo del Apellido es obligatorio")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El apellido debe contener solo letras")
        .isUppercase().withMessage("El apellido solo debe contener letras en mayuscula"),
    check("secondSurname")
      .not().isEmpty()
      .withMessage("El campo del Segundo Apellido es obligatorio")
      .if((value: string) => value.length > 0)
        .isString().withMessage("El segundo apellido debe contener solo letras")
        .isUppercase().withMessage("El segundo apellido solo debe contener letras en mayuscula"),
    check("othersnames")
      .if((value: string) => value.length > 0)
        .isString().withMessage("Otros nombres deben ser solo letras")
        .isUppercase().withMessage("Otros nombre solo debe contener letras en mayuscula")
  ],
  async function(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(200).json({
        Error: true,
        Message: errors.array().map(error => error.msg)
      })
    }

    const employeeModel = new UpdateEmployeeModel(
      req.body._id,
      req.body.idNumber,
      req.body.firstname,
      req.body.surname,
      req.body.secondSurname,
      req.body.country,
      req.body.idType,
      req.body.area,
      req.body.email,
      req.body.othersnames
    );

    UpdateOne(employeeModel)
      .then(result => {
        return res
          .status(200)
          .json(result)
      })
      .catch(error => {
        return res
          .status(400)
          .json(error)
      })
  }
).delete(
  '/', 
  async function(req: Request, res: Response, next: NextFunction) {
    DeleteOne(req.query._id as string)
    .then(result => {
      return res
        .status(200)
        .json(result)
    })
    .catch(error => {
      return res
        .status(200)
        .json(error)     
    })
  }
)

module.exports = router;
