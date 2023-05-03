// declare variables and assign to express module, and express.Router()
const express = require('express');
const router = express.Router();

// import controllers
const routeController = require('../controller/routeController');


// set up basic CRUD routes

router.get('/', routeController.getAllTasks, (req, res) => {
  //console.log(`end of get request BE route`);
  res.status(200).json(res.locals.tasks);
});

router.post('/', routeController.createNewTask, (req, res) => {
  // console.log(`end of post request BE route`);
  res.status(200).json(res.locals.newTask)
});

router.put('/:id', routeController.updateTask, (req, res) => {
  console.log(`end of UPDATE request BE route`);
  res.status(200).json(res.locals.updatedTask);
});

router.delete('/:id', routeController.deleteTask, (req, res) => {
  console.log(`end of DELETE request BE route`);
  res.status(200).json({ message: 'successful delete request' })
});


// Don't forget to export router so server has access 
module.exports = router;