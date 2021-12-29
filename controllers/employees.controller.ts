import {
  check,
  validationResult
} from 'express-validator';
import { FindAll, InsertOne, UpdateOne, DeleteOne } from '../services/employee.service'
import { Router, Request, Response, NextFunction } from 'express'
import { EmployeeModel, UpdateEmployeeModel } from '../model/models/employee.model';
import { CountryEnum } from '../model/enums/enums';
import { EmployeesFilters } from '../utils/filters.utils';
import { IResponseModel } from '../model/models/response.model';
var router = Router();

router.post(
  '/',
  async function(req: Request, res: Response, next: NextFunction) {
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
  async function(req: Request, res: Response, next: NextFunction) {
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
  '/',
  async function(req: Request, res: Response, next: NextFunction) {

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
