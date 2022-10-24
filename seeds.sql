USE employee_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('legal');

INSERT INTO emp_role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jason', 'Jackson', 1, NULL),
('John', 'Jackson', 2, 1),
('Jack', 'Johnson', 3, NULL),
('Jordan', 'Carmichael', 4, 3),
('Carmichael', 'Jordan', 5, NULL),
('LeBrick', 'Fraud', 6, 5),
('Russell', 'Westbrick', 7, NULL),
('Jabronte', 'Sticklemeister', 8, 7);
