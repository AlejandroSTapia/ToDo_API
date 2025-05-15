import { getConnection } from "../database/connection";
import sql from 'mssql';

  const pool = getConnection();

export const getTasks = async(req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM todo.Tasks');
    console.log(result);
res.json(result.recordset);
}

export const getTaskId = async (req, res) => {
  console.log(req.params);
  const pool = await getConnection();

  const result = await pool.request()
  .input('id', sql.Int, req.params.id)
  .query('SELECT * FROM todo.Tasks WHERE IdTask = @id');

  if (result.recordset.length === 0) {
    return res.status(404).json({
      message: 'Nota no encontrada'
    });
  }

  return res.json(result.recordset[0]);
}

export const createTask = async (req, res) => {
  console.log('Cuerpo de la solicitud:',req.body);
  const pool = await getConnection();

  const result = await pool.request()
  .input('title', sql.NVarChar, req.body.Title)
  .input('description', sql.NVarChar, req.body.Description)
  .input('completed', sql.Bit, req.body.Completed)
  .input('creationdate', sql.DateTime, req.body.CreationDate)
  .input('updated_at', sql.DateTime, req.body.updated_at)
  .query('INSERT INTO todo.Tasks (title, description, completed, creationdate,updated_at) VALUES (@title, @description, @completed, @creationdate, @updated_at); SELECT @@IDENTITY AS id;');

  console.log(result);

  res.json({
    message: 'Tarea creada',
     body: {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      creationdate: req.body.creationdate,
      updated_at: req.body.updated_at
}});
} 

export const updateTask = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request()
  .input('id', sql.Int, req.params.id)
  .input('title', sql.NVarChar, req.body.Title)
    .input('description', sql.NVarChar, req.body.Description)
    .input('completed', sql.Bit, req.body.Completed)
    .input('creationdate', sql.DateTime, req.body.CreationDate)
    .input('updated_at', sql.DateTime, req.body.updated_at)
  .query('UPDATE todo.Tasks SET title = @title, description = @description, completed = @completed, creationdate = @creationdate, updated_at = @updated_at WHERE idTask = @id');

  console.log(result);
  
  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({
      message: 'Nota no encontrada'
    });
  }
    return res.json({
        message: 'Tarea actualizada',
        body: {
            title: req.body.Title,
            description: req.body.Description,
            completed: req.body.Completed,
            creationdate: req.body.Creationdate,
            updated_at: req.body.Updated_at
        }
    });
}

export const deleteTask = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM todo.Tasks WHERE IdTask = @id');
    console.log(result);
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    return res.json({
        message: 'Tarea eliminada con id ' + req.params.id
    });
}