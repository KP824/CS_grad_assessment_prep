// set up our express routes here
const path = require('path');
const express = require('express');
const cors = require('cors');
const PORT = 5500;
const app = express();
// import api router routes
const apiRouter = require('./routes/api');


/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../FE')));

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// })

// defined route handlers (check line 7)
app.use('/tasks', apiRouter);

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

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


/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;


