const express = require("express");
const { get } = require("http");
const ApiRouter = express.Router();
const {TaskController} = require('./../controllers/ApiController');


ApiRouter
    .get( '/tasks', TaskController.allTasks );
ApiRouter
    .post('/tasks', TaskController.addTask);
ApiRouter
    .delete('/remove/:title', TaskController.removeTask );
ApiRouter
    .get('/tasks/:title', TaskController.findByName );
ApiRouter
    .put('/taskss/:title', TaskController.update );

module.exports = {ApiRouter}