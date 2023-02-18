console.log('Hello World')

let salaries = [];

let submitForm = event => {
    event.preventDefault();
    console.log('Testing submitForm()', event);
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
    console.log('new employe object:', newEmployee)
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
            <h3 id="totalCost" style="background-color: red;">
            Total Monthly Cost: $${monthly}
            </h3>
        `
    } else {
        totalDiv.innerHTML = `<h3 id="totalCost">Total Monthly Cost: $${monthly}</h3>`;
    }
}