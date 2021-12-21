import { Router } from 'express';
import db from '../database/db';
import _ from 'lodash';
import { createEmployeeSchema } from '../schema/schema';
const employeesRouter = Router();


async function createEmployee(req: any, res: any, next: any) {
 
  const projectBody = { ...req.body, createdDate: new Date() }
  await db.employees.insert(projectBody)
  return res.json("Record Inserted");
}

employeesRouter.get('/', async (request, response) => {
  const data = await db.employees.find({});
  //todo omit
  return response.json(data);
});
employeesRouter.get('/:employeeId', async (request, response) => {
  const { employeeId } = request.params;
  const data = await db.employees.find({employeeId})
  //todo omit
  return response.json(data);
});

employeesRouter.post("/add", createEmployeeSchema, createEmployee)
export default employeesRouter;