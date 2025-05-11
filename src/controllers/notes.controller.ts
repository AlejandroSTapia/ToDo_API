import { getConnection } from "../database/connection";
import sql from 'mssql';

  const pool = getConnection();

export const getNotes = async(req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM todo.Notes');
    console.log(result);
res.json(result.recordset);
}

export const getNoteId = async (req, res) => {
  console.log(req.params);
  const pool = await getConnection();

  const result = await pool.request()
  .input('id', sql.Int, req.params.id)
  .query('SELECT * FROM todo.Notes WHERE idNote = @id');

  if (result.recordset.length === 0) {
    return res.status(404).json({
      message: 'Nota no encontrada'
    });
  }

  return res.json(result.recordset[0]);
}

export const createNote = async (req, res) => {
  console.log('Cuerpo de la solicitud:',req.body);
  const pool = await getConnection();

  const result = await pool.request()
  .input('title', sql.NVarChar, req.body.Title)
  .input('content', sql.NVarChar, req.body.Content)
  .input('active', sql.Bit, req.body.Active)
  .input('creationdate', sql.DateTime, req.body.CreationDate)
  .query('INSERT INTO todo.Notes (title, content, active, creationdate) VALUES (@title, @content, @active, @creationdate); SELECT @@IDENTITY AS id;');

  console.log(result);

  res.json({
    message: 'Nota creada',
     body: {
      title: req.body.Title,
      content: req.body.Content,
      active: req.body.Active,
      creationdate: req.body.Creationdate
}});
} 

export const updateNote = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request()
  .input('id', sql.Int, req.params.id)
  .input('title', sql.NVarChar, req.body.Title)
    .input('content', sql.NVarChar, req.body.Content)
    .input('active', sql.Bit, req.body.Active)
    .input('creationdate', sql.DateTime, req.body.CreationDate)
  .query('UPDATE todo.Notes SET title = @title, content = @content, active = @active, creationdate = @creationdate WHERE idNote = @id');

  console.log(result);
  
  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({
      message: 'Nota no encontrada'
    });
  }
    return res.json({
        message: 'Nota actualizada',
        body: {
            title: req.body.Title,
            content: req.body.Content,
            active: req.body.Active,
            creationdate: req.body.Creationdate
        }
    });
}

export const deleteNote = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM todo.Notes WHERE idNote = @id');
    console.log(result);
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
            message: 'Nota no encontrada'
        });
    }

    return res.json({
        message: 'Nota eliminada con id ' + req.params.id
    });
}