// create our front end using dom manipulation here
window.addEventListener("DOMContentLoaded", (event) => {
  console.log(`DOM fully loaded and parsed`);
})

// START OF CREATING AND APPENDING ELEMENTS TO DOM

const startHeader = document.createElement('h2');
startHeader.innerHTML = "Hello world, start of our page";
// Use this approach to add all additional elements to our HTML page
// document.body.appendChild(variable name here)
document.body.appendChild(startHeader);

const newLine = document.createElement('h3');
newLine.innerHTML = "GRAD ASSESSMENT YOU\'RE MY BBBIYAHHH";
document.body.appendChild(newLine);

// Start making a container to insert todo functions in
const mainContainerTest = document.createElement('div');
mainContainerTest.setAttribute('class', 'main-container');
document.body.appendChild(mainContainerTest);

// NOTE setting the attribute and textContent must be done separately and can not be chained.
const toDoListHeader = document.createElement('h2');
toDoListHeader.setAttribute('id', 'toDoList-header');
toDoListHeader.textContent = 'Woohoo! We\'re creating a SQL, basic To Do List App!';

// inserting header into main container
// can play around with the position parameter to test how the header is inserted in relation to mainContainerTest
mainContainerTest.insertAdjacentElement('afterbegin', toDoListHeader);

const toDoListPara = document.createElement('p');
toDoListPara.setAttribute('class', 'intro-p');
toDoListPara.textContent = 'Please describe the task you\' like to add here:';

// Inserting paragraph under header
toDoListHeader.insertAdjacentElement('afterend', toDoListPara);


// Create a task form 
const taskForm = document.createElement('form');
taskForm.setAttribute('class', 'task-form');
// add form below the para tag
toDoListPara.insertAdjacentElement('afterend', taskForm);

// HELPER FUNCTION TO ADD MULTIPLE ATTRIBUTES
function setMultiAttributes(el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// // create task input 
const taskInput = document.createElement('input');
// INEFFICIENT
// taskForm.setAttribute('class', 'task-form');
// taskForm.setAttribute('type', 'text');
// taskForm.setAttribute('size', '50');
// taskForm.setAttribute('name', 'name');
// taskForm.setAttribute('palceholder', 'Add your task here');

const setOfAttrs = {
  'class': 'task-input',
  'type': 'text',
  'size': '50',
  'name': 'taskInput',
  'placeholder': 'Hey BB, U got me feelin\' punchdrunk crazy',
};
// EFFICIENT
setMultiAttributes(taskInput, setOfAttrs);

// insert input container as first child in form tag
taskForm.insertAdjacentElement('afterbegin', taskInput);

// create a submit button for the input form
const submitTask = document.createElement('button');
submitTask.setAttribute('type', 'submit');
submitTask.textContent = 'Add Task';

// alternative to using insertAdjacentElement
taskForm.appendChild(submitTask);

// CREATING EVENTLISTENER FOR ADD TASK SUBMIT EVENT
taskForm.addEventListener('submit', function(event) {
  // The event.preventDefault() method is called to prevent the default form submission behavior, which would cause the page to reload.
  event.preventDefault();
  // declare a variable that we will pass the input data to BE
  const taskValue = taskInput.value;
  // this is separate function to handle fetch request
  // console.log(`Inside of taskForm event listener. taskValue: ${taskValue}`);
  addTaskToDatabase(taskValue);
  // clear input form after successful submit
  taskForm.reset();
});

// CREATE CONTAINER FOR ALL TASKS
const taskListContainer = document.createElement('div');
taskListContainer.setAttribute('class', 'taskList-cont');
mainContainerTest.appendChild(taskListContainer);

// Want to do a GET request here and append each row if data in as a child element into taskListContainer
fetch('/tasks', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
})
  .then(response => response.json())
  .then(response => {
    // console.log(`this is data from GET request: ${response}`)
    // iterate through array of data 
    // pass each data through createTaskElement function with the two pieces of info
    response.forEach(data => createTaskElement(data.id, data.directions))
  })
  .catch(error => console.error(`Error with FE get request : ${error}`));


// FUNCTIONS TO EXECUTE & ADD TO ELEMENTS:

// CREATE FUNCTION TO GENERATE ELEMENT WITH EDIT AND DELETE BUTTONS
function createTaskElement(id, directions) {
  const taskElement = document.createElement('div');
  taskElement.setAttribute('class', 'task');
  taskElement.setAttribute('key', id);
  taskElement.textContent = directions;

   // create edit button
   const editButton = document.createElement('button');
   editButton.setAttribute('class', 'edit-button');
   editButton.textContent = 'Edit Task';

   // create delete button
   const deleteButton = document.createElement('button');
   deleteButton.setAttribute('class', 'delete-button');
   deleteButton.textContent = 'Delete';

  // add event listener to edit button
  editButton.addEventListener('click', editTaskInDatabase);

  // add event listener to delete button
  deleteButton.addEventListener('click', function(event) {
    //console.log(`task info : ${response}`)
    deleteTaskInDatabase(id);
    taskListContainer.removeChild(taskElement);
    taskListContainer.removeChild(editButton);
    taskListContainer.removeChild(deleteButton);
  });

   // append task element, edit & delete button to taskListContainer
   taskListContainer.appendChild(taskElement);
   taskListContainer.appendChild(editButton);
   taskListContainer.appendChild(deleteButton);
};

// CREATE ADD-TASK-TO-DATABASE FUNCTION
function addTaskToDatabase(taskValue) {
  // create fetch request
  // console.log(`Inside of add task to database. taskValue: ${taskValue}`);
  fetch('http://localhost:5500/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // key is the same as destructured version in the routeController file
    body: JSON.stringify({ directions: taskValue })
  })
  // then statements
  // .then(response => response.json())s
  .then(response => response.json())
  .then(response => {
    console.log(`this is response: ${JSON.stringify(response)}`)
    return response
  })
  .then(response => {
    createTaskElement(response.id, response.directions);
  })
  .catch(error => console.error(`There's an error in task post request FE: ${error}`));
};

// FUNCTION FOR PUT REQUEST
function editTaskInDatabase(directions, taskId) {
  fetch(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ directions: directions })
  })
  .then(response => response.json())
  .then(response => {
    console.log(`This is response from put request: ${response}`)
    return response;
  })
  .catch(error => console.log(`Error from put request FE: ${error}`))
};


// FUNCTION FOR DELETE REQUEST
function deleteTaskInDatabase(taskId) {
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(response => {
    console.log(`This is response from delete request: ${JSON.stringify(response)}`)
    return response;
  })
  .catch(error => console.log(`Error from delete request FE: ${error}`));
};


 /* BASIC DOM MANIPULATION METHODS TO USE:

// CREATE A NEW DOM ELEMENT
document.createElement('tagType')

// ADD TO THE BODY SECTION OF HTML DOCUMENT (will add at the last position on DOM)
// document.body.appendChild(variable name here)

// METHODS TO CAPTURE OR ASSIGN VALUES TO EXISITING ELEMENTS
document.getElementById('string that is case sensitive')
document.querySelector()
document.querySelectorAll()


// SET ATTRIBUTE METHOD
newDiv.setAttribute('id', 'myDiv');
newDiv.setAttribute('class', 'myClass');

// SET TEXT CONTENT INSIDE OF EACH ELEMENT
It's better to use textContent for overall performance boost!
document.innerHTML = it is roughly what you would get if you selected the text and copied.
document.textContent = textContent is a concatenation of the values of all TextNodes in the sub-tree.

// ADDING NEWLY CREATED ELEMENTS INTO SPECIFIC POSITIONS ON DOM
use: element.insertAdjacentElement(position, newElement);

- position parameter: inserts the new element as a child element at the specified position. Must be one of the four following string:
  a) 'beforebegin': Insert the new element as a previous sibling of the existing element.
  b) 'afterbegin': Insert the new element as the first child of the existing element.
  c) 'beforeend': Insert the new element as the last child of the existing element.
  d) 'afterend': Insert the new element as a next sibling of the existing element.

- newElement parameter: insert any variable that represents a element that needs to be added to DOM

EXAMPLE: existingDiv.insertAdjacentElement('afterend', newDiv); // Here, newDiv will be appended below existingDiv, as a sibling element 

// ONE OF MANY METHODS: https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
document.body.insertBefore(divToInsert, divToInsertBefore)

// EXAMPLE OF A BUTTON FUNCTION WITH CHANGING COLORS
Button example:
<html lang="en">
  <head>
    <title>getElementById example</title>
  </head>
  <body>
    <p id="para">Some text here</p>
    <button onclick="changeColor('blue');">blue</button>
    <button onclick="changeColor('red');">red</button>
  </body>
</html>

function changeColor(newColor) {
  const elem = document.getElementById("para");
  elem.style.color = newColor;
}

*/

/* EXAMPLE FROM CHAT FOR CREATING A FORM. MUST DOUBLE CHECK TO SEE IF APPLICABLE. NO USE OF FETCH REQUEST YET

Here are the steps to create a form where we can submit a task:

    Create a form element:

const taskForm = document.createElement('form');

    Create an input element where users can enter their task:

const taskInput = document.createElement('input');
taskInput.setAttribute('type', 'text');
taskInput.setAttribute('placeholder', 'Enter task');
taskInput.setAttribute('name', 'task');

    Create a submit button element:

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Add Task';

    Append the input and submit button elements to the form element:

taskForm.appendChild(taskInput);
taskForm.appendChild(submitButton);

    Add an event listener to the form element to listen for a submit event:

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskValue = taskInput.value;
  addTaskToList(taskValue);
  taskForm.reset();
});

In this example, addTaskToList is a function that we will create later that will add the task to a list of tasks.

The event.preventDefault() method is called to prevent the default form submission behavior, which would cause the page to reload.

Finally, we call taskForm.reset() to clear the input field after the task has been added.

    Create an empty div element to contain the list of tasks:

const taskListContainer = document.createElement('div');

Here's the complete addTaskToList function with the delete button event listener:

function addTaskToList(taskValue) {
  // create task element
  const taskElement = document.createElement('div');
  taskElement.setAttribute('class', 'task');
  taskElement.textContent = taskValue;
  
  // create edit button
  const editButton = document.createElement('button');
  editButton.setAttribute('class', 'edit-button');
  editButton.textContent = 'Edit';
  
  // create delete button
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete-button');
  deleteButton.textContent = 'Delete';
  
  // add event listener to edit button
  editButton.addEventListener('click', function(event) {
    const newTaskValue = prompt('Enter new task value:');
    if (newTaskValue !== null) {
      taskElement.textContent = newTaskValue;
    }
  });
  
  // add event listener to delete button
  deleteButton.addEventListener('click', function(event) {
    taskListContainer.removeChild(taskElement);
    taskListContainer.removeChild(editButton);
    taskListContainer.removeChild(deleteButton);
  });
  
  // append task element, edit button, and delete button to taskListContainer
  taskListContainer.appendChild(taskElement);
  taskListContainer.appendChild(editButton);
  taskListContainer.appendChild(deleteButton);
}

In this example, we add an event listener to the deleteButton that removes the taskElement, editButton, and deleteButton from the taskListContainer.


// HELPER FUNCTION TO ADD MULTIPLE ATTRIBUTES 
attrs = an object of key value pairs, where the key is the attribute name, and it's value is whatever we want to set to

function setAttributesFunc(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

example: 
setAttributesFunc(myTestElement, { 'class': 'my-custom-class', 'id': 'my-test-id' });

 // create individual task element
    const taskElement = document.createElement('div');
    taskElement.setAttribute('class', 'task');
    taskElement.setAttribute('key', response.id);
    taskElement.textContent = response.directions;

    // create edit button
    const editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-button');
    editButton.textContent = 'Edit Task';

    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.textContent = 'Delete';
*/