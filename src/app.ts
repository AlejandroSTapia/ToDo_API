import express from 'express';
import TasksRoutes from './routes/tasks.routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(TasksRoutes);

export default app;