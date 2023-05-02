// create our front end using dom manipulation here


const startHeader = document.createElement('h1');
{/* <h1>Hello world, start of our page</h1> */}
startHeader.innerHTML = "Hello world, start of our page";

// Use this approach to add all additional elements to our HTML page
// document.body.appendChild(variable name here)
document.body.appendChild(startHeader);

