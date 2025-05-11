import express from 'express';
import NotesRoutes from './routes/notes.routes';

const app = express();

app.use(express.json());

app.use(NotesRoutes);

export default app;