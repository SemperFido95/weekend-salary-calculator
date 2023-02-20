console.log('Hello World')

let salaries = [];

let submitForm = event => {
    event.preventDefault();
    salaries.push({
        firstName: event.target[0].value,
        lastName: event.target[1].value,
        idNumber: event.target[2].valueAsNumber,
        job: event.target[3].value,
        annualSalary: event.target[4].valueAsNumber
    });
    clearInputs();
    addToTable(salaries);
    total(salaries);
}

let clearInputs = () => {
    let inputDiv = document.getElementById('new-employee');
    let children = inputDiv.children;
    for (let i = 0; i < children.length - 1; i++) {
        children[i].value = '';
    }
}

let addToTable = array => {
    let tableDiv = document.getElementById('add-new');
    let newEmployee = array[array.length - 1];
    tableDiv.innerHTML += `
        <tr>
            <td>${newEmployee.firstName}</td>
            <td>${newEmployee.lastName}</td>
            <td>${newEmployee.idNumber}</td>
            <td>${newEmployee.job}</td>
            <td>${newEmployee.annualSalary}</td>
            <td><button onclick="remove(event)">Delete</button></td>
        </tr>
    `
}

let remove = event => {
    console.log(event);
    let removeName = event.target.parentElement.parentElement.children[1].innerHTML;
    for (employee in salaries) {
        if (removeName === salaries[employee].lastName) {
            salaries.splice(employee, 1)
        }
    }
    total(salaries);
    event.target.parentElement.parentElement.remove();
}

let total = array => {
    let total = 0;
    for (object of array) {
        total += object.annualSalary;
    };
    let monthly = Math.round(total / 12);
    let totalDiv = document.getElementById('total');
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