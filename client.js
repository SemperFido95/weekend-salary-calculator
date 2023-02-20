console.log('Hello World')

//array which will hold each employee as an object
let salaries = [];

let submitForm = event => {
    //preventing page from refeshing after submit is pressed
    event.preventDefault();
    //creates a new object based on input values and pushes object into array
    salaries.push({
        firstName: event.target[0].value,
        lastName: event.target[1].value,
        idNumber: event.target[2].value,
        job: event.target[3].value,
        annualSalary: event.target[4].valueAsNumber
    });
    //calling clearInputs()
    clearInputs();
    //calling addToTable()
    addToTable(salaries);
    //calling total()
    total(salaries);
}

//clears form input fields 
let clearInputs = () => {
    let inputDiv = document.getElementById('input-buttons');
    let children = inputDiv.children;
    //loops over each input field and clears their values
    for (let i = 0; i < children.length - 1; i++) {
        children[i].value = '';
    }
}

//adds data from employee object into table
let addToTable = array => {
    let tableDiv = document.getElementById('add-new');
    //allows newEmployee to equal the most recently-submitted employee
    let newEmployee = array[array.length - 1];
    tableDiv.innerHTML += `
        <tr>
            <td>${newEmployee.firstName}</td>
            <td>${newEmployee.lastName}</td>
            <td>${newEmployee.idNumber}</td>
            <td>${newEmployee.job}</td>
            <td>$${newEmployee.annualSalary}</td>
            <td><button onclick="remove(event)">Delete</button></td>
        </tr>
    `
}

let remove = event => {
    //getting the last name, which is the innerHTML of the second td element in the row
    let removeName = event.target.parentElement.parentElement.children[2].innerHTML;
    //looping over salaries array to find the object with the matching id, then removing from array
    for (employee in salaries) {
        if (removeName === salaries[employee].idNumber) {
            salaries.splice(employee, 1)
        }
    }
    //calling total() to recalculate number displayed on DOM
    total(salaries);
    //removing row from table on DOM 
    event.target.parentElement.parentElement.remove();
}

//calculating total monthly cost and displaying on DOM
let total = array => {
    let total = 0;
    //looping over each object in array to get sum of all annual salaries
    for (object of array) {
        total += object.annualSalary;
    };
    //calculating total monthly cost and rounding to nearest dollar
    let monthly = Math.round(total / 12);
    let totalDiv = document.getElementById('total');
    //adding totalDiv element to DOM and changing background to red if total exceeds 20000
    if (monthly > 20000) {
        totalDiv.innerHTML = `
            <h3>Total Monthly Cost: $
            <span id="totalCost" style="background-color: red;">${monthly}</span>
            </h3>
        `
    } else {
        totalDiv.innerHTML = `<h3>Total Monthly Cost: <span id="totalCost">$${monthly}</span></h3>`;
    }
}