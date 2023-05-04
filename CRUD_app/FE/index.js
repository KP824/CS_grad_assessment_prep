// create our front end using dom manipulation here


const startHeader = document.createElement('h1');
{/* <h1>Hello world, start of our page</h1> */}
startHeader.innerHTML = "Hello world, start of our page";

// Use this approach to add all additional elements to our HTML page
// document.body.appendChild(variable name here)
document.body.appendChild(startHeader);

const newLine = document.createElement('h3');
newLine.innerHTML = "I HATE STUDYING";
document.body.appendChild(newLine);

const newLine2 = document.createElement('h3');
newLine2.innerHTML = "I HATE STUDYING, BUT I OVE SUCCESS";
document.body.appendChild(newLine2);


 /*
In the front-end code (e.g., HTML or React component), create a form that allows the user to input the necessary data for the task. For example:

html

<form>
  <label>
    Directions:
    <input type="text" name="directions" />
  </label>
  <button type="submit">Create Task</button>
</form>

Add an event listener to the form to handle the submission. When the form is submitted, prevent the default behavior of the browser and send an HTTP POST request to the server with the data from the form. For example, using fetch():

javascript

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = {
    directions: formData.get('directions'),
  };
  const response = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
});

In this example, we create a new FormData object from the form, then extract the directions field from the form data and create a data object. We then send an HTTP POST request to the /tasks route on the server with the data object in the request body as a JSON string.

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

That's it! Of course, this is just a basic example and you'll likely need to modify it to fit your specific use case. Also, make sure to handle errors and sanitize input data to prevent SQL injection attacks.

*/