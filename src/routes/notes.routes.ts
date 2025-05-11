import {Router} from 'express';
import {createNote, deleteNote, getNoteId, getNotes, updateNote} from '../controllers/notes.controller';

const router = Router();

router.get('/', (req, res) => {
  res.send('Notes route');
}
);

router.get('/notes', getNotes );

router.get('/notes/:id', getNoteId);

router.post('/notes', createNote);

router.put('/notes/:id', updateNote);

router.delete('/notes/:id', deleteNote);

export default router;