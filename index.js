const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
  'user': 'root',
  'database': 'employees'
});
// id  first_name  last_name  role_id  manager_id
//
db.query(`
SELECT
  e.id,
  CONCAT(e.first_name, ' ', e.last_name) AS name,
  role.title,
  role.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employee e
LEFT JOIN role
ON e.role_id = role.id
LEFT JOIN employee m
ON e.manager_id = m.id
`, (err, employees) => {
  if (err) console.log(err);
  console.table(employees);
});