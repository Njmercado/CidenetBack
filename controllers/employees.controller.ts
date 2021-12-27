import {
  check,
  validationResult
} from 'express-validator';
import { FindAll, InsertOne } from '../services/employee.service'
import { Router, Request, Response, NextFunction } from 'express'
import { EmployeeModel } from '../model/models/employee.model';
import { Countries, IDTypes } from '../model/enums/enums';
var router = Router();

router.post(
  '/',
  [
  ],
  async function(req: Request, res: Response, next: NextFunction) {
    const country: Countries = Countries[req.body.country as keyof typeof Countries]

    const employeeModel = new EmployeeModel(
      req.body.firstname,
      req.body.surname,
      req.body.secondSurname,
      country,
      req.body.idType,
      req.body.othersnames
    );
    const result = await InsertOne(employeeModel)

    return res
      .status(200)
      .json(result)
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
