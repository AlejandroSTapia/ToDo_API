"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../controllers/tasks.controller");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Tasks route');
});
router.get('/tasks', tasks_controller_1.getTasks);
router.get('/tasks/:id', tasks_controller_1.getTaskId);
router.post('/tasks', tasks_controller_1.createTask);
router.put('/tasks/:id', tasks_controller_1.updateTask);
router.delete('/tasks/:id', tasks_controller_1.deleteTask);
exports.default = router;
