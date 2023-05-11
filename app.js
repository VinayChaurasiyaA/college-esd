const employeeList = document.getElementById("employee-list");

function renderEmployees() {
  fetch("/api/employees")
    .then((response) => response.json())
    .then((employees) => {
      employeeList.innerHTML = "";
      employees.forEach((employee) => {
        const row = document.createElement("tr");
        // create a cell for the employee's name
        const nameCell = document.createElement("td");
        nameCell.innerText = employee.name;
        row.appendChild(nameCell);

        // create a cell for the employee's job title
        const jobTitleCell = document.createElement("td");
        jobTitleCell.innerText = employee.job_title;
        row.appendChild(jobTitleCell);

        // create a cell for the employee's email address
        const emailCell = document.createElement("td");
        emailCell.innerText = employee.email;
        row.appendChild(emailCell);

        // add the row to the employee list table
        employeeList.appendChild(row);
      });
    });
}
// / call the renderEmployees function to initially populate the employee list
renderEmployees();

// set up a WebSocket connection to receive real-time updates to the employee list
const socket = new WebSocket("ws://localhost:8000/api/employees");
socket.addEventListener("message", (event) => {
  const employee = JSON.parse(event.data);
  // create a new row in the employee list table
  const row = document.createElement("tr");

  // create a cell for the employee's name
  const nameCell = document.createElement("td");
  nameCell.innerText = employee.name;
  row.appendChild(nameCell);

  // create a cell for the employee's job title
  const jobTitleCell = document.createElement("td");
  jobTitleCell.innerText = employee.job_title;
  row.appendChild(jobTitleCell);

  // create a cell for the employee's email address
  const emailCell = document.createElement("td");
  emailCell.innerText = employee.email;
  row.appendChild(emailCell);

  // add the row to the top of the employee list table
  employeeList.insertBefore(row, employeeList.firstChild);
});
