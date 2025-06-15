"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskId = exports.getTasks = void 0;
const connection_1 = require("../database/connection");
const mssql_1 = __importDefault(require("mssql"));
const pool = (0, connection_1.getConnection)();
const getTasks = async (req, res) => {
    const pool = await (0, connection_1.getConnection)();
    const result = await pool.request().query('SELECT * FROM todo.Tasks');
    console.log(result);
    res.json(result.recordset);
};
exports.getTasks = getTasks;
const getTaskId = async (req, res) => {
    console.log(req.params);
    const pool = await (0, connection_1.getConnection)();
    const result = await pool.request()
        .input('id', mssql_1.default.Int, req.params.id)
        .query('SELECT * FROM todo.Tasks WHERE IdTask = @id');
    if (result.recordset.length === 0) {
        return res.status(404).json({
            message: 'Nota no encontrada'
        });
    }
    return res.json(result.recordset[0]);
};
exports.getTaskId = getTaskId;
const createTask = async (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body);
    const pool = await (0, connection_1.getConnection)();
    const result = await pool.request()
        .input('title', mssql_1.default.NVarChar, req.body.Title)
        .input('description', mssql_1.default.NVarChar, req.body.Description)
        .input('completed', mssql_1.default.Bit, req.body.Completed)
        .input('creationdate', mssql_1.default.DateTime, req.body.CreationDate)
        .input('updated_at', mssql_1.default.DateTime, req.body.updated_at)
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
        }
    });
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const pool = await (0, connection_1.getConnection)();
    const result = await pool.request()
        .input('id', mssql_1.default.Int, req.params.id)
        .input('title', mssql_1.default.NVarChar, req.body.Title)
        .input('description', mssql_1.default.NVarChar, req.body.Description)
        .input('completed', mssql_1.default.Bit, req.body.Completed)
        .input('creationdate', mssql_1.default.DateTime, req.body.CreationDate)
        .input('updated_at', mssql_1.default.DateTime, req.body.updated_at)
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
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const pool = await (0, connection_1.getConnection)();
    const result = await pool.request()
        .input('id', mssql_1.default.Int, req.params.id)
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
};
exports.deleteTask = deleteTask;
