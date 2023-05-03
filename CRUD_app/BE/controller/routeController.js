// declare middle ware for ours routes\
const db = require('../model/model');

const routeController = {};

// Create middle ware for each CRUD function
routeController.getAllTasks = async (req, res, next) => {
  try {
    const search = 'SELECT * FROM TASKS';

    const getTasks = await db.query(search);

    // The evaluated result of the query at the rows property, will be an array of objects. Each object will the each input into the data base, in this case the id value and the task directions.
    console.log(`JSON.rows[0]: ${JSON.stringify(getTasks.rows)}`);
    res.locals.tasks = getTasks.rows;
    return next();
  }
  catch (err) {
    return next({
      log: 'error occured in routeController.getAllTasks',
      status: 500,
      message: { err: `Error in getAllTasks, ${err}` },
    });
  }
};

routeController.createNewTask = async (req, res, next) => {
  try {
    // destructure / sanitize req body
    const { directions } = req.body;
    // create query for db 
    const addQuery = `
      INSERT INTO TASKS (directions) 
      VALUES ($1)
      RETURNING *
      `;

    // Declare variable for addTask
    const addTask = await db.query(addQuery, [directions]);

    // console.log(`addTask: ${addTask}`);
    // console.log(`addTask.json().rows: ${JSON.stringify(addTask.rows)}`);
    console.log(`addTask.rows[0]: ${JSON.stringify(addTask.rows[0])}`);
    res.locals.newTask = addTask.rows[0];
    return next();
  }
  catch (err) {
    return next({
      log: 'error occured in routeController.createNewTask',
      status: 500,
      message: { err: `Error in createNewTask, ${err}`}
    });
  };
};

routeController.updateTask = async (req, res, next) => {
  try {
    const { id, updateTask } = req.body;
    console.log(`this is req.body: ${JSON.stringify(req.body)}`);
    // const updateQuery = `
    //   UPDATE TASKS
    //     WHERE id = ${id}
    //     SET directions = $1
    //     RETURNING *;
    // `;

    const response = await db.query(`
    UPDATE TASKS
      WHERE id = ${id}
      SET directions = ${updateTask}
      RETURNING *;
  `);
    res.locals.updatedTask = response.rows[0];
    return next();

  }
  catch (err) {
    return next({
      log: 'error occured in routeController.updateTask',
      status: 500,
      message: { err: `Error in updateTask, ${err}`}
    });
  };
};

routeController.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.body;
    const deleteQuery = `
      DELETE FROM tasks
      WHERE id = $1  
    `;

    const response = await db.query(deleteQuery, [id])
    // There is nothing to console log here because on a successful delete, there would be in response
    return next();

  }
  catch (err) {
    return next({
      log: 'error occured in delete task',
      status: 500,
      message: { err: `error in deleteTask, ${err}`}
    });
  };
};




module.exports = routeController;