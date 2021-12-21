import express, { Express, Request, Response } from 'express';
// import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import projectsRouter from './routes/projects';
import employeesRouter from './routes/employees';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

function initializeSwagger() {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'GSK Project',
        version: '1.0.0',
        description: 'sample docs',
      },
    },
    apis: ['swagger.yaml'],
  };

  const specs = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
initializeSwagger();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/project', projectsRouter);
app.use('/employee', employeesRouter);


app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
