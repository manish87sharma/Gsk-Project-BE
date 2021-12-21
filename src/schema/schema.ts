import { Employee } from '../interfaces/employees.interface';
import validator from '../middlewares/validator';
const joi = require('joi');

// create the schema with validation rules and constrains
// export const userSchema = joi.object({
//     name: joi.string().alphanum().min(10).max(80).required(),
//     description: joi.string().min(50).max(300),
//     startDate: joi.date().required(),
//     // Employees: joi.array().valid('employeeSchema'),
//     // employees: Joi.object({
//     //     role: Joi.string()
//     //       .required()
//     //       .valid('support', 'seller')
//     //   }).required()
// });

const employeeSchema = joi.object({
    fullName: joi.string().regex(/^[a-zA-Z]*$/).min(3).max(50).required(),
    employeeId: joi.string().alphanum().length(6).required()
});

export function createProjectSchema(req: any, res: any, next: any) {
    const schema = joi.object({
        name: joi.string().alphanum().min(10).max(80).required(),
        description: joi.string().min(50).max(300),
        startDate: joi.date().required(),
        employees: joi.array().items(employeeSchema)
    });
    validator(schema, req, res, next);
}

// export const employeeSchema = joi.object({
//     fullName: joi.string().regex(/^[a-zA-Z]*$/).min(3).max(50).required(),
//     employeeId: joi.string().alphanum().length(10).required()
// });


export function createEmployeeSchema(req: any, res: any, next: any) {
    validator(employeeSchema, req, res, next);
}

