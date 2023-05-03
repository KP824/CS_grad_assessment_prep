const { Pool } = require('pg');
const PG_URI = 'postgres://jnsouugl:b3A9eY8IEb0AxoyGsv78vxZZEoKv7rbF@lallah.db.elephantsql.com/jnsouugl';

const pool = new Pool({
  connectionString: PG_URI
});

/*
CREATE TABLE tasks ( 
  id SERIAL PRIMARY KEY,
  directions VARCHAR(255)
)

// create a test initial task, used following query, capitalized table name matters in this case:

INSERT INTO TASKS (directions) VALUES ('testing first task in table')
INSERT INTO TASKS (directions) VALUES ('testing second task in table')

^Example of post request query
*/

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};