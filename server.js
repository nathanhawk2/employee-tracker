const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('console.table');
const prompt = inquirer.createPromptModule();

// Wrap the database in a top level function so we can await the result of the connection before continuing
const db = mysql.createConnection({ user: 'root', database: 'employee_db' });


const viewAllDepts = () => {
    db.query(`SELECT * FROM department`, (error, deparment) => {
        if (error) throw error;
        console.table(department);
        start();
    });
};

const viewAllRoles = () => {
    db.query(`SELECT emp_role.id, emp_role.title, emp_role.salary, 
    department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`,
        (error, roles) => {
            if (error) throw error;
            console.table(roles);
            start();
        });
};

const viewAllEmps = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
    department.name AS department, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
    FROM employee LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    `,
        (error, employees) => {
            if (error) throw error;
            console.table(employees);
        });
};

const addDepartment = () => {
    inquirer.prompt({ message: 'New Department Name', name: 'name' })
        .then((input) => {
            db.query(`INSERT INTO department SET ?`, input, (error) => {
                if (error) throw error;
                console.log('New Department Added');
                start();
            });
        });
};

const addRole = () => {
    inquirer.prompt([
        { message: 'New Role Name', name: 'title' },
        { message: 'Enter Salary of New Role', name: 'salary' },
        { message: 'Enter Department ID of New Role', name: 'department_id' }
    ]).then((input) => {
        db.query(`INSERT INTO role SET ?`, input, (error) => {
            if (error) throw error;
            console.log(`New Role Added`);
            start();
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        { message: 'Enter Employees First Name', name: 'first_name' },
        { message: 'Enter Employees Last Name', name: 'last_name' },
        { message: 'Enter Employees Role ID', name: 'role_id' },
        { message: 'Enter Employees Managers ID', name: 'manager_id' }
    ]).then((input) => {
        db.query(`INSERT INTO employee SET ?`, input, (error) => {
            if (error) throw error;
            console.log(`New Employee Added`);
            start();
        });
    });
};

const updateEmpRole = () => {
    inquirer.prompt([
        { message: 'Enter ID of Employee', name: 'id' },
        { message: 'Enter New Role ID of Employee', name: 'role_id' }
    ]).then((input) => {
        db.query(`UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`, [input.role_id, input.id], (error) => {
            if (error) throw error;
            console.log('Updated Employee Role');
            start();
        });
    });
};

const start = () => {
    inquirer.prompt({
        type: 'rawlist', name: 'action', choices: [
            'View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit',
        ],
        message: 'Employee Tracker:: Pick One'
    }).then((answers) => {
        switch (answers.action) {
            case 'View All Departments': return viewAllDepts(); 
            case 'View All Roles': return viewAllRoles(); 
            case 'View All Employees': return viewAllEmps(); 
            case 'Add a Department': return addDepartment(); 
            case 'Add a Role': return addRole(); 
            case 'Add an Employee': return addEmployee(); 
            case 'Update Employee Role': return updateEmpRole(); 
            case 'Exit':
                console.log("beep boop");
        }
    });
};

main();
start();