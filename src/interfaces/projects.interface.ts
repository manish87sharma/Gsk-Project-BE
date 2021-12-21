
import { Employee } from './employees.interface';
export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  employees?: Employee[]
}
