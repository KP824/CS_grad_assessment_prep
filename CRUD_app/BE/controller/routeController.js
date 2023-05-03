// declare middle ware for ours routes\
const db = require('../model/model');


const routeController = {};


routeController.getAllTasks = (req, res, next) => {
  const search = 'SELECT * FROM tasks_table';

  db
    .query(search)
    .then((data) => {
      console.log(`data: ${JSON.justify(data)}`);
      // adjust the information on data depending on how it will log in the console
      res.locals.tasks = data;
      return next();
    })
    .catch((err) =>  {
      return next({
        log: 'error occured in routeController.getAllTasks',
        status: 500,
        message: { err: `Error in getAllTasks, ${err}` },
      })
    });
};