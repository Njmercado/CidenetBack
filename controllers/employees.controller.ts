import {
  check,
  validationResult
} from 'express-validator';
import { FindAll, InsertOne } from '../services/employee.service'
import { Router, Request, Response, NextFunction } from 'express'
import { EmployeeModel } from '../model/models/employee.model';
import { CountryEnum } from '../model/enums/enums';
var router = Router();

router.post(
  '/',
  [
  ],
  async function(req: Request, res: Response, next: NextFunction) {
    const country: CountryEnum = CountryEnum[req.body.country as keyof typeof CountryEnum]

    const employeeModel = new EmployeeModel(
      req.body.firstname,
      req.body.surname,
      req.body.secondSurname,
      country,
      req.body.idType,
      req.body.area,
      req.body.admissionDate,
      req.body.registerDate,
      req.body.othersnames
    );
    InsertOne(employeeModel)
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
).get(
  '/',
  async function(req: Request, res: Response, next: NextFunction) {
    const page = Number.parseInt(req.query["page"] as string);
    const documents = Number.parseInt(req.query["documents"] as string);
    const result = await FindAll(page, documents);
    return res
      .status(200)
      .json(result);
  }
)

module.exports = router;
