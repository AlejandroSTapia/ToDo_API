import express from 'express';
import tasksRoutes from './routes/tasks.routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", tasksRoutes); 

app.get("/", (req, res) => {
  res.send("API funcionando correctamente en Azure");
});

export default app;