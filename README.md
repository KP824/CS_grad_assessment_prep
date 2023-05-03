# CS_grad_assessment_prep
// group decision to practice with SQL database
// Setup our package.json, and server requirements
1. "npm init" in console, answer all questions or ('npm initi -y')
2. install express, pg ("post gres" / sequel), and nodemon
  "npm install express pg"
  "npm i -D nodemon"
3. set up index.html file (! shortcut)
4. create index.css file
** Note 5 & 6 check href pathway is correct, especially if files are nested in sub folders
5. link css file to index.html (<link rel="stylesheet" href="PATHWAY">)
6. link index.js to index.html (<script src="PATHWAY"></script>)
7. To create an element, first create a variable and assign it to (document.createElement('element name))
    --startHeader.innerHTML = 'Whatever you want to display'
    --document.appendChild(variable name) --> Use this approach to add all additional elements to our HTML page

// setting up SQL database 
1. login into elephant SQL (https://www.elephantsql.com/)
2. Click on " new instance", create name and select region
3. Once instance is created use selected details to insert into server.js file
    password, URL, possibly API-key?
    server: lallah.db.elephantsql.com (lallah-01)
    password: b3A9eY8IEb0AxoyGsv78vxZZEoKv7rbF
    URL: postgres://jnsouugl:b3A9eY8IEb0AxoyGsv78vxZZEoKv7rbF@lallah.db.elephantsql.com/jnsouugl
    API Key: 640c1843-4050-4df7-8aa5-8bb613fdc7ca

    const dbKEY = process.env.SQL_KEY
    const dbKey = postgres://jnsouugl:b3A9eY8IEb0AxoyGsv78vxZZEoKv7rbF@lallah.db.elephantsql.com/jnsouugl

// set up our BE server file
1. Call our path / express files and require the correct modules to use
    /*
      const path = require('path')
      const express = require('express')
    */
2. Declare the app variable and assign to express
3. Use app.use passing in the following commands to handle parsing request body.
/*
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
*/
4. Set up global error handler underneath required routes
  example: 
/*
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
*/
5. Declare a PORT variable and assign to port value (3000 or 3500)
6. To start server, call:
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
7. Also import the proper routes modules and set up the route handler in server file.
'' const apiRoute = require('./routes/api'); "
8. Lastly, export the app as module.exports.

//Set up our database
1. create a model.js file that includes:
// importing a module in Node.js. We're loading a module, which is a third part library for connecting to PostgreSQL databases in node.js, called 'pg(postgres)'
  --detructure Pool and require in a postgres module (const { Pool } = require('pg'))
  --declare a constant PG_URI and set its value to the database key
  --create a new instance of Pool and set the key connectionString to the value of PG_URI
  --export the module ()
  2. create a route controller file 
    a-- require in the route to the database model.js file
    b-- declare a constant variable and set its value to an object literal
    c-- create a route controller that passes in req, res, next
    d-- declare a variable that will create a query to the database (const search = 'SELECT * FROM tasks_table';)
    e-- query the database, passing in the previously declared variable (db.query(search))
    f-- then pass in data and assign it to a property on res.locals (.then((data) => {
      res.locals.tasks = data;
      return next();
      }))
    g-- catch any errors (db.catch(err))
  3. Create a schema for the db. Find out if we need to initialize our table (CREATE TABLE) schema within the elephant SQL browser, or if there's a way to initialize the table within VS code.


// Setting up Routes file
1. Create a routes folder then an api.js file
2. First thing in file is to declare express and import the module
3. Declare a router and assign to value of express.Router()
4. import middleware controllers (Will create middleware file next)
  a-- Make sure require path is going to correct file
5. Outline basic CRUD requests (get, post, put, delete). Each route ends with a (req, res) call back function.
  a-- Can create console logs in each route to ensure that BE is hitting each step correctly
  b-- Depending on what is saved to res.locals, we can update the response of data from the BE to the FE
6. Export the api routes file as a module, so that the server file has access to the routes


// Set up middleware Controllers file
1. Declare a variable and assign to database model
2. Declare variable and assign to empty object so we can create methods for middleware
3. When creating middleware controller, keep in since each method accepts three parameters (req, res, next). Best use case has been creating them as async functions and implementing the try, catch blocks.
  a-- Besure to return next() within both try and catch blocks
  b-- can use res.locals object to return specific information to the FE
4. Be sure to export the controller object name.



// NOTE FOR TESTING WITH POSTMAN:
- enter correct address pathway
- for inputs ensure body option is selected
- select raw option, also change dropdown option from TEXT to JSON
- In the body box, make sure to create your test inputs in JSON format (everything goes in an object)
- preface each column with their proper key name that you'll be using in the destructuring of the req.body


  Tasks for tomorrow:
  - Create basicl CRUD routes and middle ware
  - Test those routes in POSTMAN to see if we can CRUD the tasks within our database
  - Create input forms in our front end using dom manipulation
  - Test FE inputs and submit form to see if it works with Database
 

