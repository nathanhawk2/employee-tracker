DROP DATABASE IF EXISTS employee_db
CREATE DATABASE employee_db

USE employee_db

CREATE TABLE emp_role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10, 2) NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM emp_role;
SELECT * FROM department;
SELECT * FROM employee;