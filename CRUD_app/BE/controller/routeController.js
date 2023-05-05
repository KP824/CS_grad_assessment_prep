// declare middle ware for ours routes\
const db = require('../model/model');

const routeController = {};

// Create middle ware for each CRUD function
routeController.getAllTasks = async (req, res, next) => {
  try {
    // sql command to grab everything from the table 'tasks'
    const search = 'SELECT * FROM TASKS';
    // queries the db, passing in the query string 'search'
    const getTasks = await db.query(search);

    // The evaluated result of the query at the rows property, will be an array of objects. Each object will be individual inputs into the data base, in this case the id value and the task directions. Each task is represented as a row on the "Tasks" table.
    // console.log(`JSON.rows: ${JSON.stringify(getTasks.rows)}`);
    
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
  console.log(`inside of BACK END FROM SUBMIT REQUEST`);
  try {
    // destructure / sanitize req body
    const { directions } = req.body;
    // create query for db 
    const addQuery = `
      INSERT INTO TASKS (directions) 
      VALUES ($1)
      RETURNING *
      `;

    console.log(`inside of create new task. req.body: ${JSON.stringify(req.body)}`);
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
    const { directions } = req.body;
    const { id } = req.params;

    const params = [ directions, id];

    console.log(`this is req.body: ${JSON.stringify(req.body)}`);

    const updateQuery = `
    UPDATE TASKS
    SET directions = $1
    WHERE id = $2
    RETURNING *;
    `;
   
    const response = await db.query(updateQuery, params);

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
    const { id } = req.params;
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

/*

On the server, create a route handler that handles the POST request and inserts the new task into the SQL database. For example:

javascript

    router.post('/tasks', async (req, res, next) => {
      try {
        const { directions } = req.body;
        const result = await db.query(
          'INSERT INTO tasks (directions) VALUES ($1) RETURNING *',
          [directions]
        );
        res.json(result.rows[0]);
      } catch (err) {
        next(err);
      }
    });

    In this example, we extract the directions field from the req.body object and insert it into a SQL query using parameterized values. We then use the db.query() method to execute the query and retrieve the newly created task. Finally, we send the task as a JSON response back to the front end.
*/