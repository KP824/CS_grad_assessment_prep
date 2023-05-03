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

  Tasks for tomorrow:
  - Create basicl CRUD routes and middle ware
  - Test those routes in POSTMAN to see if we can CRUD the tasks within our database
  - Create input forms in our front end using dom manipulation
  - Test FE inputs and submit form to see if it works with Database
 

