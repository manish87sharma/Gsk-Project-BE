// import { projectSchema } from './../middlewares/exampleValidation/exampleValidation';
import { Router } from 'express';
import { RequestTimeout } from 'http-errors';
import { any } from 'joi';
import db from '../database/db';
// import {validateBody} from '../middlewares/validateBody';
import { createProjectSchema } from '../schema/schema';
const projectRouter = Router();
db.projects.loadDatabase();

async function getMaxId(collectionName: string) {
  let result: any;
  if (collectionName === "projects") {
    [result] = await db.projects.find({}).sort({ createdDate: -1 }).limit(1)
  } else if (collectionName === "employees") {
    [result] = await db.employees.find({}).sort({ createdDate: -1 }).limit(1)
  }
  return result?.id ? ++result.id : 100;
}


async function createProject(req: any, res: any, next: any) {
  let id = await getMaxId("projects");
  const employeeId = Math.random().toString(36).substr(2, 6);
  const { name, startDate, description, employees } = req.body;
  const projectBody = {
    id, name, startDate, description, employees,
    createdDate: new Date(),
  }
  // const projectBody = { ...req.body, createdDate: new Date(), id }
  await db.projects.insert(projectBody)
  return res.json("Record Inserted");
}

async function updateProject(req: any, res: any, next: any) {
  const { projectId } = req.params;
  const data = await db.projects.update({ id: +projectId }, { $set: { ...req.body } })
  return res.json("Record updated");

}

projectRouter.get('/', async (request, response) => {
  // getProjectId();
  const data = await db.projects.find({})
  return response.json(data);
});
projectRouter.get('/:projectId', async (request, response) => {
  // getProjectId();
  const { projectId } = request.params;
  const data = await db.projects.find({ id: +projectId })
  return response.json(data);
});

projectRouter.post("/add", createProjectSchema, createProject)
projectRouter.put("/update/:projectId", createProjectSchema, updateProject)
export default projectRouter;