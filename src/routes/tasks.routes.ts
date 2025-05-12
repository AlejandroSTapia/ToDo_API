import {Router} from 'express';
import {createTask, deleteTask, getTaskId, getTasks, updateTask} from '../controllers/tasks.controller';

const router = Router();

router.get('/', (req, res) => {
  res.send('Tasks route');
}
);

router.get('/tasks', getTasks );

router.get('/tasks/:id', getTaskId);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

export default router;